function SearchBar({ keyword, setKeyword, onSearch }) {
  return (
    <div className="flex items-center gap-2 px-4 py-2">
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="flex-1 border p-2 rounded"
        placeholder="여행지를 검색하세요"
      />
      <button
        onClick={onSearch}
        className="bg-blue text-white px-3 py-2 rounded"
      >
        검색
      </button>
    </div>
  );
}
export default SearchBar;
