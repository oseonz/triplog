import React, { useState } from "react";

export default function BookmarkPanel({
  isOpen,
  onClose,
  bookmarkedTour = [],
  bookmarkedFood = [],
}) {
  // 내부 상태로 선택된 장소 관리
  const [selected, setSelected] = useState(null);

  if (!isOpen) return null;
  return (
    <>
      <div className="p-4">
        <h3 className="font-bold mb-3">여행지</h3>
        {/* 여행지 섹션 */}
        {bookmarkedTour.map((place) => (
          <div
            key={place.contentid}
            className="p-3 border mb-3 cursor-pointer shadow-md rounded-lg hover:bg-gray-100"
            onClick={() => handlePlaceClick(place)}
          >
            <div className="w-12 h-12 rounded-full bg-yellow-400 flex items-center justify-center text-white font-bold text-xs">
              이미지
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold truncate">{place.title}</p>
              <p className="text-xs text-gray-500 truncate">{place.addr1}</p>
            </div>
            <div className="text-right">
              <span className="text-xl">♥</span>
              <span className="ml-1 text-sm">{place.likes ?? 0}개수</span>
            </div>
          </div>
        ))}
        {/* 음식점 섹션 */}
        <h3 className="font-bold mb-3">음식점</h3>
        {bookmarkedFood.map((place) => (
          <div
            key={place.contentid}
            className=" flex items-center aline-center gap-3 p-3 border mb-3 cursor-pointer shadow-md rounded-lg hover:bg-gray-100"
          >
            <img
              src={place.firstimage || "/no_img.jpg"}
              alt={place.title}
              className="w-[100px] h-[100px] object-cover rounded-full"
            />
            <div className="min-w-0 flex-1 w-[300px]">
              <p className="font-medium text-xl truncate">{place.title}</p>
              <p className="text-sm text-gray-600 truncate overflow-hidden">
                {place.addr1}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
