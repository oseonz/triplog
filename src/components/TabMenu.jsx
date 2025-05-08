function TabMenu({ currentTab, setCurrentTab }) {
  const tabs = ["여행만들기", "찜", "상세설명"];
  return (
    <div className="flex border-b bg-white">
      {tabs.map((tab, index) => (
        <button
          key={tab}
          onClick={() => setCurrentTab(tab)}
          className={`flex-1 px-4 py-2 font-semibold
          ${index !== 0 ? "border-l border-gray-300" : ""}
          ${
            currentTab === tab
              ? "text-black border-b-2 border-black border-l-0 border-r-0 border-t-0"
              : "text-black border-b border-transparent"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
export default TabMenu;
