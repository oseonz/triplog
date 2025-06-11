import React, { useEffect, useState } from 'react';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { getRegionCodeFromKeyword } from '../../../../utils/regionUtils';
import { fetchTourPlaces } from '../../../../api/course/tourSearchApi';
import {
    courseDataState,
    searchKeywordState,
    searchResultState,
} from '../../../../pages/course/atom/courseState';
import { getLikes, getList } from '../../../../api/course/placeLikes';
import { getFavorites } from '../../../../api/course/favoritesApi';
import { fetchDetailIntro } from '../../../../api/course/tourSearchApi';
import { userState } from '../../../../pages/mypage/atom/userState';
import { checkLike } from '../../../../api/course/placeLikes';

function SearchBar({
    selectedType,
    onSearchReset,
    setMapCenter,
    setMapLevel,
    currentTab,
    setSelectedType,
}) {
    const [keyword, setKeyword] = useState('');
    const setCourseData = useSetRecoilState(courseDataState);
    const user = useRecoilValue(userState);
    const [loading, setLoading] = useState(false);
    const setSearchKeyword = useSetRecoilState(searchKeywordState);
    const setSearchResult = useSetRecoilState(searchResultState);

    const handleSearch = async (isAuto = false) => {
        if (!isAuto && !keyword.trim()) return alert('검색어를 입력하세요!');
        if (onSearchReset) onSearchReset();

        const region = getRegionCodeFromKeyword(keyword) || { areaCode: 1 };
        if (!keyword || !region?.areaCode) {
            alert('해당 지역을 찾을 수 없습니다.');
            return;
        }

        setLoading(true);

        try {
            // 🌀 동시에 두 타입 검색
            const [rawTours, rawFoods] = await Promise.all([
                fetchTourPlaces('12', 20, region.areaCode, region.sigunguCode),
                fetchTourPlaces('39', 20, region.areaCode, region.sigunguCode),
            ]);

            // 📍 좌표 중심 잡기 (여행지 먼저 기준으로)
            const coordBase = [...rawTours, ...rawFoods].find(
                (place) => place.mapx && place.mapy,
            );
            if (region.lat && region.lng) {
                setMapCenter({ lat: region.lat, lng: region.lng });
                setMapLevel(8);
            } else if (coordBase) {
                setMapCenter({
                    lat: Number(coordBase.mapy),
                    lng: Number(coordBase.mapx),
                });
                setMapLevel(9);
            }

            // 🔧 enrich 공통 처리 함수
            const enrich = async (items, type) =>
                await Promise.all(
                    items.map((item) =>
                        Promise.all([
                            getLikes(item.contentid),
                            fetchDetailIntro(
                                item.contentid,
                                item.contenttypeid,
                            ),
                            checkLike(user.id, item.contentid),
                            getFavorites(user.id, item.contentid),
                        ]).then(([like, detail, mylike, favorite]) => {
                            const firstFavorite = Array.isArray(favorite)
                                ? favorite[0]
                                : null;
                            return {
                                ...item,
                                likes_count: like,
                                detail,
                                mylike: mylike.my_check,
                                favorite: firstFavorite?.favorites_id ?? null,
                            };
                        }),
                    ),
                );

            // 🧪 동시 enrich
            const [tourResults, foodResults] = await Promise.all([
                enrich(rawTours, '12'),
                enrich(rawFoods, '39'),
            ]);

            // ✅ 저장
            setCourseData({
                typeOneList: tourResults,
                typeTwoList: foodResults,
            });
            setSearchResult({
                typeOneList: tourResults,
                typeTwoList: foodResults,
            });
            setSearchKeyword(keyword);
        } catch (err) {
            console.error('❌ 검색 실패:', err);
            alert('검색 중 오류가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        if (currentTab === '콕콕검색' && keyword) {
            handleSearch(true); // 👈 자동으로 현재 keyword 기준 재검색 실행
        }
    }, [selectedType]);
    return (
        <div className="flex items-center justify-center gap-2 mt-4">
            <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="시/군/구 까지 검색이 가능합니다."
                className="w-[310px] border p-2 rounded h-[40px]"
            />
            <button
                onClick={handleSearch}
                className="w-[75px] bg-blue-500 text-white py-2 rounded h-[40px]"
            >
                검색
            </button>
        </div>
    );
}

export default SearchBar;
