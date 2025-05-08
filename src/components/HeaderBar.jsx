import React from "react";

function HeaderBar({ onBack, onShare }) {
  return (
    <div className="flex justify-between items-center px-5 py-4 border-b bg-white">
      {/* ←콕콕플래너 */}
      <button
        onClick={onBack}
        className="text-lg font-semibold flex items-center gap-1 text-gray-800"
      >
        <span className="text-2xl">←</span> 콕콕플래너
      </button>

      {/* 공유 버튼 */}
      <button
        onClick={onShare}
        className="text-base text-gray-800 hover:text-orange-500 flex items-center"
      >
        🍰 공유
      </button>
    </div>
  );
}

export default HeaderBar;
