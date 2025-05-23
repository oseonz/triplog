import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

function HeaderBar({ onBack, onShare }) {
  const [tripTitle, setTripTitle] = useState("");

  return (
    <div className="flex justify-between items-center px-8 py-4 border-b bg-white">
      {/* ←콕콕플래너 */}
      <button
        onClick={onBack}
        className="text-xl font-semibold flex items-center gap-1 text-gray-800"
      >
        <span className="text-xl">
          <Link to="/">←</Link>
        </span>{" "}
        콕콕플래너
      </button>
      <div className="p-2 flex justify-center">
        <div className="flex align-center items-center">
          <input
            type="text"
            className="w-[260px] border p-2 rounded text-lg font-normal h-[px] "
            placeholder="코스 제목을 입력하세요."
            value={tripTitle}
            onChange={(e) => setTripTitle(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

export default HeaderBar;
