import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { courseDataState } from "../course/atom/courseState";
import {
  fetchTourPlaces,
  fetchDetailIntro,
} from "../../api/course/tourSearchApi.js";
import { fetchFavorites } from "../../api/course/favoritesApi.jsx";
import { fetchLikeList } from "../../api/course/placeLikes";
import TripCreator from "../../components/course/kokkok-planner/trip-creator/TripCreator.jsx";

function CourseBuilder() {
  const setCourseData = useSetRecoilState(courseDataState);
  const [currentTab, setCurrentTab] = useState("여행만들기"); // ✅ 상태 선언 추가!

  useEffect(() => {
    const userId = 1;

    const preload = async () => {
      try {
        const [tourPlaces, foodPlaces] = await Promise.all([
          fetchTourPlaces(12),
          fetchTourPlaces(39),
        ]);

        const [favoriteTour, favoriteFood] = await Promise.all([
          fetchFavorites({ user_id: userId, contenttypeid: 12 }),
          fetchFavorites({ user_id: userId, contenttypeid: 39 }),
        ]);

        const likeList = await fetchLikeList({
          user_id: userId,
          page: 1,
          size: 100,
        });

        if (!Array.isArray(likeList)) {
          console.error("❌ likeList가 배열이 아님!", likeList);
          return;
        }

        const likesMap = {};
        likeList.forEach((item) => {
          likesMap[item.contentid] = item.likes_count ?? 0;
        });

        const bookmarkedIds = [
          ...favoriteTour.map((item) => item.contentid),
          ...favoriteFood.map((item) => item.contentid),
        ];

        // ✅ 상세 intro + 이미지 병합
        const detailIntro = async (places) => {
          return await Promise.all(
            places.map(async (place) => {
              try {
                const detail = await fetchDetailIntro(
                  // ✅ 이거로 고쳐야 해!
                  place.contentid,
                  place.contenttypeid
                );
                const images = await fetchImages(place.contentid);

                return {
                  ...place,
                  ...(Array.isArray(detail) ? detail[0] : detail),
                  images: Array.isArray(images) ? images : [],
                };
              } catch (err) {
                console.warn("⚠️ 상세정보 병합 실패", place.title, err);
                return place;
              }
            })
          );
        };

        const detailIntroTourPlaces = await detailIntro(tourPlaces);
        const detailIntroFoodPlaces = await detailIntro(foodPlaces);

        setCourseData({
          tourPlaces: detailIntroTourPlaces,
          foodPlaces: detailIntroFoodPlaces,
          likesMap,
          bookmarkedIds,
        });
      } catch (err) {
        console.error("초기 데이터 로딩 실패 ❌", err);
      }
    };

    preload();
  }, []);

  // ✅ 상태 props로 전달
  return <TripCreator currentTab={currentTab} setCurrentTab={setCurrentTab} />;
}

export default CourseBuilder;
