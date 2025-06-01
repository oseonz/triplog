import React, { useEffect, useState } from 'react';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { getRegionCodeFromKeyword } from '../../../../utils/regionUtils';
import { fetchTourPlaces } from '../../../../api/course/tourSearchApi';
import { courseDataState } from '../../../../pages/course/atom/courseState';
//import { selectedTypeState } from "../../../../pages/course/atom/courseState";
import { getLikes, getList } from '../../../../api/course/placeLikes';
import { getFavorites } from '../../../../api/course/favoritesApi';
import { fetchDetailIntroNew } from '../../../../api/course/tourSearchApi';
import { userState } from '../../../../pages/mypage/atom/userState';
import { checkLike } from '../../../../api/course/placeLikes';

function SearchBar({ selectedType, onSearchReset }) {
    const [keyword, setKeyword] = useState('');
    const setCourseData = useSetRecoilState(courseDataState);
    const user = useRecoilValue(userState);
    const [loading, setLoading] = useState(false);
    const handleSearch = async (isAuto = false) => {
        if (!isAuto && !keyword.trim()) return alert('검색어를 입력하세요!');
        if (onSearchReset) onSearchReset();
        console.log('검색', selectedType); // props로 받은 선택 타입
        console.log('user.id', user.id);
        const region = getRegionCodeFromKeyword(keyword);
        console.log(' 검색', selectedType);
        console.log('👉 최종 API 요청값', {
            type: selectedType,
            areaCode: region?.areaCode,
        });
        if (!isAuto && (!region || !region.areaCode)) {
            alert('해당 지역을 찾을 수 없습니다.');
            return;
        }
        setLoading(true);

        try {
            const rawResults = await fetchTourPlaces(
                selectedType,
                20,
                region.areaCode,
            );
            console.log('🎯 받아온 rawResults:', rawResults);
            const enrichedResults = await Promise.all(
                rawResults.map((item) =>
                    Promise.all([
                        getLikes(item.contentid),
                        fetchDetailIntroNew(item.contentid, item.contenttypeid),
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
                className="w-[320px] border p-2 rounded h-[40px]"
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
