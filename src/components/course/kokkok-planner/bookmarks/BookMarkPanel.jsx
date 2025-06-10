import React from 'react';
import { useRecoilValue } from 'recoil';
import { courseDataState } from '../../../../pages/course/atom/courseState';
import ListViewComp from '../trip-creator/ListViewComp';

export default function BookMarkPanel({ checkLike, checkFavorite }) {
    const courseData = useRecoilValue(courseDataState);

    const tourFavorites = (courseData.typeOneList || []).filter(
        (item) => item.favorite,
    );
    const foodFavorites = (courseData.typeTwoList || []).filter(
        (item) => item.favorite,
    );

    // console.log('📍 관광지 찜 리스트:', tourFavorites);
    // console.log('🍽 음식점 찜 리스트:', foodFavorites);

    return (
        <div className="px-4 py-2 overflow-y-auto">
            {/* 📌 관광지 섹션 */}
            <h2 className="text-xl font-semibold mb-2 ">
                📍 관광지 찜 리스트{' '}
            </h2>
            {tourFavorites.length > 0 ? (
                tourFavorites.map((item) => (
                    <ListViewComp
                        key={item.contentid}
                        place={item}
                        cardType="two"
                        checkLike={checkLike}
                        checkFavorite={checkFavorite}
                    />
                ))
            ) : (
                <p className="text-gray-500">찜한 관광지가 없습니다.</p>
            )}

            {/* 🍽 음식점 섹션 */}
            <h2 className="text-xl font-semibold mt-6 mb-2">
                🍽 음식점 찜 리스트
            </h2>
            {foodFavorites.length > 0 ? (
                foodFavorites.map((item) => (
                    <ListViewComp
                        key={item.contentid}
                        place={item}
                        cardType="two"
                        checkLike={checkLike}
                        checkFavorite={checkFavorite}
                    />
                ))
            ) : (
                <p className="text-gray-500">찜한 음식점이 없습니다.</p>
            )}
        </div>
    );
}
