function CourseTabs({ tab, setTab }) {
  return (
    <div className="w-full max-w-screen-md flex border-b bg-white text-center">
      <button
        onClick={() => setTab("best")}
        className={`flex-1 py-3 text-lg font-semibold border-b-2 ${
          tab === "best"
            ? "border-black text-black"
            : "border-transparent text-gray-400"
        }`}
      >
        월간 BEST 여행코스
      </button>
      <button
        onClick={() => setTab("my")}
        className={`flex-1 py-3 text-lg font-semibold border-b-2 ${
          tab === "my"
            ? "border-black text-black"
            : "border-transparent text-gray-400"
        }`}
      >
        나의 여행 코스
      </button>
    </div>
  );
}

export default CourseTabs;
