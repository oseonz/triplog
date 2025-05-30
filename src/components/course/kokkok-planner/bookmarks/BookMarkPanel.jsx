import React from "react";
import { useRecoilValue } from "recoil";
import { courseDataState } from "../../../../pages/course/atom/courseState";
import ListViewComp from "../trip-creator/ListViewComp"; // 혹은 맞는 경로로

export default function BookMarkPanel() {
  const courseData = useRecoilValue(courseDataState);

  const bookmarkedTourList = courseData.typeOneList.filter(
    (item) => item.favorite !== null
  );

  const bookmarkedFoodList = courseData.typeTwoList.filter(
    (item) => item.favorite !== null
  );

  return (
    <div className="px-4 py-4">
      <h2 className="text-xl font-bold mb-4">💖 나의 찜 리스트</h2>

      <h3 className="text-md font-semibold mt-4">📌 관광지</h3>
      {bookmarkedTourList.length > 0 ? (
        <ListViewComp listdata={bookmarkedTourList} />
      ) : (
        <p className="text-gray-500">찜한 관광지가 없습니다.</p>
      )}

      <h3 className="text-md font-semibold mt-4">🍽 음식점</h3>
      {bookmarkedFoodList.length > 0 ? (
        <ListViewComp listdata={bookmarkedFoodList} />
      ) : (
        <p className="text-gray-500">찜한 음식점이 없습니다.</p>
      )}
    </div>
  );
}
