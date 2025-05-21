function TabMenu({ currentTab, setCurrentTab }) {
  const tabs = ["여행만들기", "찜", "여행노트"];

  return (
    <div className="flex border-b bg-white">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setCurrentTab(tab)}
          className={`flex-1 px-4 py-2 font-semibold text-lg
            ${
              currentTab === tab
                ? "text-black border-b-2 border-black"
                : "text-gray-400 border-b"
            }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
export default TabMenu;
