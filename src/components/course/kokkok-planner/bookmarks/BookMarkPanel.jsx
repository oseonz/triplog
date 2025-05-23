import React, { useEffect, useState } from "react";
import { fetchFavorites } from "../../../../api/favoritesApi";
import DetailPanel from "../trip-creator/DetailPanel";

export default function BookMarkPanel({ isOpen, onClose }) {
  const [selectedPlace, setSelectedPlace] = useState(null); // ✅ 추가!
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [bookmarkedTour, setBookmarkedTour] = useState([]);
  const [bookmarkedFood, setBookmarkedFood] = useState([]);
  const [loading, setLoading] = useState(true);
  const [likedMap, setLikedMap] = useState({});
  const [courseList, setCourseList] = useState([]);
  const [likeCountMap, setLikeCountMap] = useState({});

  useEffect(() => {
    if (!isOpen) return;

    const loadFavorites = async () => {
      try {
        setLoading(true);
        const [tour, food] = await Promise.all([
          fetchFavorites({ user_id: 1, contenttypeid: 12 }),
          fetchFavorites({ user_id: 1, contenttypeid: 39 }),
        ]);
        setBookmarkedTour(Array.isArray(tour) ? tour : []);
        setBookmarkedFood(Array.isArray(food) ? food : []);
      } catch (err) {
        console.error("찜 목록 조회 실패", err);
      } finally {
        setLoading(false);
      }
    };
    loadFavorites();
  }, [isOpen]);

  // 하트 클릭 핸들러
  const handleToggleLike = (contentid) => {
    setLikedMap((prev) => ({
      ...prev,
      [contentid]: !prev[contentid], // true <-> false 토글
    }));
  };

  useEffect(() => {
    console.log("🔍 선택된 장소:", selectedPlace);
  }, [selectedPlace]);

  if (!isOpen) return null;
  const handleLoadMore = () => setVisibleCount((prev) => prev + 6);

  return (
    <div className="p-4 overflow-y-auto">
      <h3 className="font-bold mb-5 mt-1 ">
        <span className="bg-blue-300 p-2 rounded-xl  ">여행지 찜 리스트</span>
      </h3>
      {Array.isArray(bookmarkedTour) &&
        bookmarkedTour.map((place) => (
          <div
            key={place.contentid}
            className="flex items-center gap-3 p-3 border mb-3 cursor-pointer shadow-md rounded-lg hover:bg-gray-100"
            onClick={() => {
              console.log("✅ 클릭된 카드:", place);
              setSelectedPlace(place);
              setIsDetailOpen(true);
            }}
          >
            <img
              src={place.firstimage || "/no_img.jpg"}
              alt={place.title}
              className="w-[100px] h-[100px] object-cover rounded-full"
            />
            <div>
              <p className="text-sm font-bold truncate">{place.title}</p>
              <p className="text-xs text-gray-500 truncate">{place.addr1}</p>
              <img
                src={
                  likedMap[place.contentid]
                    ? "/images/i_heart.png"
                    : "/images/i_heart2.png"
                }
                alt="좋아요 하트"
                onClick={(e) => {
                  e.stopPropagation(); // 클릭 이벤트가 카드 열기로 퍼지는 것 방지
                  handleToggleLike(place.contentid);
                }}
                className="w-5 h-5 cursor-pointer"
              />
            </div>
            {/* <input
              type="checkbox"
              checked={isAdded}
              onChange={(e) => {
                e.stopPropagation();
                isAdded
                  ? handleRemoveFromCourse(place.contentid)
                  : setCourseList((prev) => [...prev, place]);
              }}
              className="w-5 h-5 accent-blue-500"
            /> */}
          </div>
        ))}

      <h3 className="font-bold mb-5 mt-6">
        <span className="bg-blue-300 p-2 rounded-xl ">음식점 찜 리스트</span>
      </h3>
      {Array.isArray(bookmarkedFood) &&
        bookmarkedFood.map((place) => (
          <div
            key={place.contentid}
            className="flex items-center gap-3 p-3 border mb-3 cursor-pointer shadow-md rounded-lg hover:bg-gray-100"
            onClick={() => {
              setSelectedPlace(place);
              setIsDetailOpen(true);
            }}
          >
            <img
              src={place.firstimage || "/no_img.jpg"}
              alt={place.title}
              className="w-[100px] h-[100px] object-cover rounded-full"
            />
            <div className="min-w-0 flex-1 w-[270px]">
              <p className="font-medium text-2xl truncate">{place.title}</p>
              <p className="text-base text-gray-600 truncate overflow-hidden">
                {place.addr1}
                <img
                  src={
                    likedMap[place.contentid]
                      ? "/images/i_heart.png"
                      : "/images/i_heart2.png"
                  }
                  alt="좋아요 하트"
                  onClick={(e) => {
                    e.stopPropagation(); // 클릭 이벤트가 카드 열기로 퍼지는 것 방지
                    handleToggleLike(place.contentid);
                  }}
                  className="w-5 h-5 cursor-pointer"
                />
              </p>
            </div>
          </div>
        ))}
      {/* 디테일 패널 */}
      {isDetailOpen && selectedPlace && (
        <DetailPanel
          place={selectedPlace}
          onClose={() => setIsDetailOpen(false)}
        />
      )}
    </div>
  );
}
