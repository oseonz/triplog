import React from "react";

function BookmarkPanel({
  isOpen,
  onClose,
  bookmarkedTour = [],
  bookmarkedFood = [],
}) {
  return (
    <>
      {/* 여행지 섹션 */}
      <h3 className="p-3 font-bold border-b mt-3">여행지</h3>

      {bookmarkedTour.map((item) => (
        <div
          key={item.contentid}
          className="flex items-center gap-3 border-b py-3 px-3"
        >
          <div className="w-12 h-12 rounded-full bg-yellow-400 flex items-center justify-center text-white font-bold text-xs">
            이미지
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold truncate">{item.title}</p>
            <p className="text-xs text-gray-500 truncate">{item.addr1}</p>
          </div>
          <div className="text-right">
            <span className="text-xl">♥</span>
            <span className="ml-1 text-sm">{item.likes ?? 0}개수</span>
          </div>
        </div>
      ))}
      {/* 음식점 섹션 */}
      <h3 className="p-3 font-bold border-b mt-3">음식점</h3>

      {bookmarkedFood.map((item) => (
        <div
          key={item.contentid}
          className="flex items-center gap-3 border-b py-3 px-3"
        >
          <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center text-white font-bold text-xs">
            이미지
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold truncate">{item.title}</p>
            <p className="text-xs text-gray-500 truncate">{item.addr1}</p>
          </div>
          <div className="text-right">
            <span className="text-xl">♥</span>
            <span className="ml-1 text-sm">{item.likes ?? 0}개수</span>
          </div>
        </div>
      ))}
    </>
  );
}

export default BookmarkPanel;
