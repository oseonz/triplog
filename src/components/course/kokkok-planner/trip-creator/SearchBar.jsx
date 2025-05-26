import React from "react";
import { getRegionCodeFromKeyword } from "../../../../utils/regionUtils";
import { fetchTourPlaces } from "../../../../api/course"; // API 함수

function SearchBar({ keyword, setKeyword, onSearch }) {
  const handleSearch = async () => {
    if (!keyword.trim()) return alert("검색어를 입력하세요!");

    const region = getRegionCodeFromKeyword(keyword);
    const results = await fetchTourPlaces("", 10, keyword, region);
    onSearch(results);
  };

  return (
    <div className=" flex  items-center justify-center gap-2 mt-4">
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="시/군/구 까지 검색이 가능합니다."
        className="w-[320px] border p-2 rounded h-[40px] "
      />
      <button
        onClick={handleSearch}
        className=" w-[75px] bg-blue-400 text-white py-2 rounded h-[40px]"
      >
        검색
      </button>
    </div>
  );
}

export default SearchBar;
