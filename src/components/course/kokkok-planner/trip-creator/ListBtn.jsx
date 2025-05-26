function ListBtn({ selectedType, setType }) {
  return (
    <div className="flex gap-2 py-6 px-4 pb-5">
      <button
        className={`flex-1 px-3 py-1 rounded text-white text-lg ${
          selectedType === "12" ? "bg-blue-400" : "bg-gray-300"
        }`}
        onClick={() => setType("12")}
      >
        여행지
      </button>
      <button
        className={` flex-1 px-3 py-1 rounded text-white text-lg ${
          selectedType === "39" ? "bg-orange-400" : "bg-gray-300"
        }`}
        onClick={() => setType("39")}
      >
        음식점
      </button>
    </div>
  );
}
export default ListBtn;
