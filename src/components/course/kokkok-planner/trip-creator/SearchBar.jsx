import React, { useState } from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { getRegionCodeFromKeyword } from "../../../../utils/regionUtils";
import { fetchTourPlaces } from "../../../../api/course/tourSearchApi";
import { courseDataState } from "../../../../pages/course/atom/courseState";
//import { selectedTypeState } from "../../../../pages/course/atom/courseState";
import { getLikes, getList } from "../../../../api/course/placeLikes";
import { getFavorites } from "../../../../api/course/favoritesApi";
import { fetchDetailIntroNew } from "../../../../api/course/tourSearchApi";
import { userState } from "../../../../pages/mypage/atom/userState";
import { checkLike } from "../../../../api/course/placeLikes";

function SearchBar() {
  const [keyword, setKeyword] = useState("");
  //const selectedType = useRecoilValue(selectedTypeState);
  const setCourseData = useSetRecoilState(courseDataState);
  const user = useRecoilValue(userState); // ✅ 사용자 ID 필요

  const handleSearch = async () => {
    if (!keyword.trim()) return alert("검색어를 입력하세요!");

    const region = getRegionCodeFromKeyword(keyword);
    if (!region || !region.areaCode) {
      alert("해당 지역을 찾을 수 없습니다.");
      return;
    }

    try {
      const rawResults = await fetchTourPlaces(
        selectedType,
        20,
        keyword,
        region
      );
      console.log("🎯 받아온 rawResults:", rawResults);
      const enrichedResults = await Promise.all(
        rawResults.map((item) =>
          Promise.all([
            getLikes(item.contentid),
            fetchDetailIntroNew(item.contentid, item.contenttypeid),
            checkLike(user.id, item.contentid),
            getFavorites(user.id, item.contentid),
          ]).then(([like, detail, mylike, favorite]) => {
            const firstFavorite = Array.isArray(favorite) ? favorite[0] : null;

            return {
              ...item,
              likes_count: like,
              detail: detail,
              mylike: mylike.my_check,
              favorite: firstFavorite?.favorites_id ?? null,
            };
          })
        )
      );

      setCourseData((prev) => ({
        ...prev,
        [selectedType === "12" ? "typeOneList" : "typeTwoList"]:
          enrichedResults,
      }));
    } catch (err) {
      console.error("❌ 검색 실패:", err);
    }
  };

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
