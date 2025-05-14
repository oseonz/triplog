import React from "react";

function HeaderBar({ onBack, onShare }) {
  return (
    <div className="flex justify-between items-center px-6 py-4 border-b bg-white">
      {/* ←콕콕플래너 */}
      <button
        onClick={onBack}
        className="text-lg font-semibold flex items-center gap-1 text-gray-800"
      >
        <span className="text-2xl">←</span> 콕콕플래너
      </button>

      {/* 공유 버튼
      <button
        onClick={onShare}
        className="flex items-center px-3 py-1.5 bg-white border border-gray-300 rounded-lg shadow-sm hover:border-orange-500 hover:text-orange-500 transition-all"
      >
        <img src="../images/i_share.png" alt="공유" className="w-5 h-5 mr-2" />
        <span className="text-sm font-medium">공유</span>
      </button> */}
    </div>
  );
}

export default HeaderBar;
