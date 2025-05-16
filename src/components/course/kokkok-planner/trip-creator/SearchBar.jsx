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
    <div className="p-3 border-b">
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="지역명을 입력하세요 (예: 전주, 강릉)"
        className="w-full border p-2 rounded"
      />
      <button
        onClick={handleSearch}
        className="mt-2 w-full bg-blue-500 text-white py-2 rounded"
      >
        검색
      </button>
    </div>
  );
}

export default SearchBar;
