function ListBtn({ selectedType, setType }) {
  return (
    <div className="flex gap-2 py-4 px-4">
      <button
        className={`flex-1 px-3 py-1 rounded text-white ${
          selectedType === "12" ? "bg-blue" : "bg-gray-400"
        }`}
        onClick={() => setType("12")}
      >
        여행지
      </button>
      <button
        className={` flex-1 px-3 py-1 rounded text-white ${
          selectedType === "39" ? "bg-blue" : "bg-gray-400"
        }`}
        onClick={() => setType("39")}
      >
        음식점
      </button>
    </div>
  );
}
export default ListBtn;
