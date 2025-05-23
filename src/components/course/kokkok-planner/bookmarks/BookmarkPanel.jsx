import React, { useEffect, useState } from "react";
import { fetchFavorites } from "../../../../api/favoritesApi";

export default function BookmarkPanel({ isOpen, onClose }) {
  const [bookmarkedTour, setBookmarkedTour] = useState([]);
  const [bookmarkedFood, setBookmarkedFood] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isOpen) return;

    const loadFavorites = async () => {
      try {
        setLoading(true);
        const [tour, food] = await Promise.all([
          fetchFavorites({ user_id: 1, contenttypeid: 12 }),
          fetchFavorites({ user_id: 1, contenttypeid: 39 }),
        ]);
        console.log("🎯 관광지:", tour);
        console.log("🎯 음식점:", food);
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

  if (!isOpen) return null;

  return (
    <div className="p-4 overflow-y-auto">
      <h3 className="font-bold mb-3">여행지</h3>
      {Array.isArray(bookmarkedTour) &&
        bookmarkedTour.map((place) => (
          <div
            key={place.contentid}
            className="p-3 border mb-3 cursor-pointer shadow-md rounded-lg hover:bg-gray-100"
          >
            <p className="text-sm font-bold truncate">{place.title}</p>
            <p className="text-xs text-gray-500 truncate">{place.addr1}</p>
          </div>
        ))}

      <h3 className="font-bold mb-3 mt-4">음식점</h3>
      {Array.isArray(bookmarkedFood) &&
        bookmarkedFood.map((place) => (
          <div
            key={place.contentid}
            className="flex items-center gap-3 p-3 border mb-3 cursor-pointer shadow-md rounded-lg hover:bg-gray-100"
          >
            <img
              src={place.firstimage || "/no_img.jpg"}
              alt={place.title}
              className="w-[100px] h-[100px] object-cover rounded-full"
            />
            <div className="min-w-0 flex-1 w-[300px]">
              <p className="font-medium text-xl truncate">{place.title}</p>
              <p className="text-sm text-gray-600 truncate">{place.addr1}</p>
            </div>
          </div>
        ))}
    </div>
  );
}
