import React from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  keywordState,
  searchResultState,
} from "../../../../components/course/atom/searchState";
import { getRegionCodeFromKeyword } from "../../../../utils/regionUtils";
import { fetchTourPlaces } from "../../../../api/course";

function SearchBar() {
  const [keyword, setKeyword] = useRecoilState(keywordState);
  const setSearchResults = useSetRecoilState(searchResultState);

  const handleSearch = async () => {
    if (!keyword.trim()) return alert("검색어를 입력하세요!");

    const region = getRegionCodeFromKeyword(keyword); // ✅ 지역 코드 추출
    const results = await fetchTourPlaces("", 10, keyword, region);
    setSearchResults(results); // ✅ 결과 전역 저장
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
