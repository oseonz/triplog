import React, { useEffect, useState } from 'react';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { getRegionCodeFromKeyword } from '../../../../utils/regionUtils';
import { fetchTourPlaces } from '../../../../api/course/tourSearchApi';
import { courseDataState } from '../../../../pages/course/atom/courseState';
import { getLikes, getList } from '../../../../api/course/placeLikes';
import { getFavorites } from '../../../../api/course/favoritesApi';
import { fetchDetailIntro } from '../../../../api/course/tourSearchApi';
import { userState } from '../../../../pages/mypage/atom/userState';
import { checkLike } from '../../../../api/course/placeLikes';

function SearchBar({ selectedType, onSearchReset, setMapCenter, setMapLevel }) {
    const [keyword, setKeyword] = useState('');
    const setCourseData = useSetRecoilState(courseDataState);
    const user = useRecoilValue(userState);
    const [loading, setLoading] = useState(false);

    const handleSearch = async (isAuto = false) => {
        if (!isAuto && !keyword.trim()) return alert('검색어를 입력하세요!');
        if (onSearchReset) onSearchReset();
        console.log('검색', selectedType); // props로 받은 선택 타입
        console.log('user.id', user.id);

        const region = getRegionCodeFromKeyword(keyword) || { areaCode: 1 };

        console.log(' 검색', selectedType);
        console.log('👉 최종 API 요청값', {
            type: selectedType,
            areaCode: region?.areaCode,
            sigunguCode: region?.sigunguCode,
        });
        if (!isAuto && (!region || !region.areaCode)) {
            if (!isAuto) alert('해당 지역을 찾을 수 없습니다.');
            console.warn('🚨 검색 실패: 지역코드 없음');
            return;
        }
        setLoading(true);

        try {
            const rawResults = await fetchTourPlaces(
                selectedType,
                20,
                region.areaCode,
                region.sigunguCode,
            );
            // 💡 유효한 좌표가 있는 첫 번째 결과 찾기
            const firstPlaceWithCoords = rawResults.find(
                (place) => place.mapx && place.mapy,
            );
            // 🔧 시군구 중심 좌표가 있으면 우선 사용
            if (region.lat && region.lng) {
                setMapCenter({
                    lat: region.lat,
                    lng: region.lng,
                });
                setMapLevel(8);
            } else if (firstPlaceWithCoords) {
                setMapCenter({
                    lat: Number(firstPlaceWithCoords.mapy),
                    lng: Number(firstPlaceWithCoords.mapx),
                });
                setMapLevel(9);
            }
            console.log('🎯 받아온 rawResults:', rawResults);
            const enrichedResults = await Promise.all(
                rawResults.map((item) =>
                    Promise.all([
                        getLikes(item.contentid),
                        fetchDetailIntro(item.contentid, item.contenttypeid),
                        checkLike(user.id, item.contentid),
                        getFavorites(user.id, item.contentid),
                    ]).then(([like, detail, mylike, favorite]) => {
                        const firstFavorite = Array.isArray(favorite)
                            ? favorite[0]
                            : null;

                        return {
                            ...item,
                            likes_count: like,
                            detail: detail,
                            mylike: mylike.my_check,
                            favorite: firstFavorite?.favorites_id ?? null,
                        };
                    }),
                ),
            );
            console.log('✅ selectedType 값:', selectedType);
            console.log(
                '✅ 저장할 key:',
                selectedType == '12' ? 'typeOneList' : 'typeTwoList',
            );
            setCourseData((prev) => ({
                ...prev,
                [selectedType == '12' ? 'typeOneList' : 'typeTwoList']:
                    enrichedResults,
            }));
        } catch (err) {
            console.error('❌ 검색 실패:', err);
        }
    };

    useEffect(() => {
        console.log('🍔 selectedType이 바뀜 → 검색 다시 실행');
        handleSearch(true);
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
