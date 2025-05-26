function ListBtn({
  selectedType,
  setSelectedType,
  showCourseList,
  setShowCourseList,
}) {
  return (
    <div className="flex gap-2 mt-4 px-4 pb-3">
      <button
        className={`flex-1 px-3 py-1 rounded text-white text-lg ${
          selectedType === "12" ? "bg-blue-400" : "bg-gray-300"
        }`}
        onClick={() => setSelectedType("12")}
      >
        여행지
      </button>
      <button
        className={` flex-1 px-3 py-1 rounded text-white text-lg ${
          selectedType === "39" ? "bg-orange-400" : "bg-gray-300"
        }`}
        onClick={() => setSelectedType("39")}
      >
        음식점
      </button>
      {/* ✅ 추가한 코스 보기 버튼 */}
      <button
        onClick={() => setSelectedType("course")}
        className={`px-4 py-2 rounded  text-lg  text-white ${
          selectedType === "course" ? "bg-blue-400" : "bg-gray-300"
        }`}
      >
        추가된 장소
      </button>
    </div>
  );
}
export default ListBtn;
