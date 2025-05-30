import React, { useEffect, useState } from "react";
import { getFavorites } from "../../../../api/course/favoritesApi";
import DetailPanel from "../trip-creator/DetailPanel";
import { useRecoilState, useSetRecoilState } from "recoil";

export default function BookMarkPanel({ isOpen }) {
  // const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [bookmarkedTour, setBookmarkedTour] = useState([]);
  const [bookmarkedFood, setBookmarkedFood] = useState([]);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   if (!isOpen) return;

  //   const loadFavorites = async () => {
  //     try {
  //       setLoading(true);
  //       const [tour, food] = await Promise.all([
  //         fetchFavorites({ user_id: 1, contenttypeid: 12 }),
  //         fetchFavorites({ user_id: 1, contenttypeid: 39 }),
  //       ]);
  //       setBookmarkedTour(tour);
  //       setBookmarkedFood(food);
  //     } catch (err) {
  //       console.error("찜 목록 조회 실패", err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   loadFavorites();
  // }, [isOpen]);

  // if (!isOpen) return null;

  // const renderPlaceItem = (place) => {
  //   const isAdded = courseList.some(
  //     (item) => item.contentid === place.contentid
  //   );

  // return (
  //   <div
  //     key={place.contentid}
  //     className="flex items-center gap-3 p-3 border mb-3 cursor-pointer shadow-md rounded-lg hover:bg-gray-100"
  //     onClick={() => {
  //       //setSelectedPlace(place);
  //       //setIsDetailOpen(true);
  //     }}
  //   >
  //     <img
  //       src={place.firstimage || "/no_img.jpg"}
  //       alt={place.title}
  //       className="w-[90px] h-[90px] object-cover rounded-full"
  //     />
  //     <div className="min-w-0 flex-1 w-[235px]">
  //       <p className="font-medium text-xl truncate">{place.title}</p>
  //       <p className="text-sm text-gray-600 truncate overflow-hidden">
  //         {place.addr1}
  //       </p>
  //     </div>

  //     <input
  //       type="checkbox"
  //       checked={isAdded}
  //       onChange={(e) => {
  //         e.stopPropagation();
  //         isAdded
  //           ? setCourseList((prev) =>
  //               prev.filter((item) => item.contentid !== place.contentid)
  //             )
  //           : setCourseList((prev) => [...prev, place]);
  //       }}
  //       className="w-5 h-5 accent-blue-500"
  //     />
  //   </div>
  // );

  return (
    <div className="p-4 overflow-y-auto">
      <h3 className="font-bold mb-5 mt-1">여행지 찜 리스트</h3>
      {/* {bookmarkedTour.map(renderPlaceItem)} */}

      <h3 className="font-bold mb-5 mt-6">음식점 찜 리스트</h3>
      {/* {bookmarkedFood.map(renderPlaceItem)} */}

      {/* {isDetailOpen && <DetailPanel onClose={() => setIsDetailOpen(false)} />} */}
    </div>
  );
}
