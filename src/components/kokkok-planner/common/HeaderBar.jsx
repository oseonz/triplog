import React from "react";
import { Link } from "react-router-dom";

function HeaderBar({ onBack, onShare }) {
  return (
    <div className="flex justify-between items-center px-7 py-6 border-b bg-white">
      {/* ←콕콕플래너 */}
      <button
        onClick={onBack}
        className="text-xl font-semibold flex items-center gap-1 text-gray-800"
      >
        <span className="text-2xl">
          <Link to="/">←</Link>
        </span>{" "}
        콕콕플래너
      </button>
      {/* 공유 버튼. */}
      <button
        onClick={onShare}
        className="text-base text-gray-800 hover:text-orange-500 flex items-center"
      >
        <img src="../public/images/i_share.png" alt="" className="w-6" />
      </button>
    </div>
  );
}

export default HeaderBar;
