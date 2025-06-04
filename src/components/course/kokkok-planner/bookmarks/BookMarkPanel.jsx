import React from 'react';
import { useRecoilValue } from 'recoil';
import {
    courseDataState,
    favoriteListState,
} from '../../../../pages/course/atom/courseState';
import ListViewComp from '../trip-creator/ListViewComp';

export default function BookMarkPanel({ checkLike, checkFavorite }) {
    const courseData = useRecoilValue(courseDataState);

    const favoriteList = useRecoilValue(favoriteListState);

    console.log('📌 typeOneList:', courseData.typeOneList);
    console.log('📌 typeTwoList:', courseData.typeTwoList);
    console.log('📌 찜 관광지', bookmarkedTourList);

    return (
        <div className="px-4 py-4">
            <h2 className="text-xl font-bold mb-4">💖 나의 찜 리스트</h2>

            <h3 className="text-md font-semibold mt-4">📌 관광지</h3>
            {bookmarkedTourList.length > 0 ? (
                bookmarkedTourList.map((item) => (
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

            <h3 className="text-md font-semibold mt-4">🍽 음식점</h3>
            {bookmarkedFoodList.length > 0 ? (
                bookmarkedFoodList.map((item) => (
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
