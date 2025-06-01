import React, { useState } from "react";

function CompactMonthPicker({ value = new Date(), onChange }) {
  const [year, setYear] = useState(value.getFullYear());
  const [month, setMonth] = useState(value.getMonth()); // 0~11

  const changeMonth = (direction) => {
    let newMonth = month + direction;
    let newYear = year;

    if (newMonth < 0) {
      newMonth = 11;
      newYear--;
    } else if (newMonth > 11) {
      newMonth = 0;
      newYear++;
    }

    setMonth(newMonth);
    setYear(newYear);
    const newDate = new Date(newYear, newMonth, 1);
    onChange?.(newDate); // 부모에게 알림
  };

  const formattedMonth = String(month + 1).padStart(2, "0");

  return (
    <div className="flex items-center text-sm space-x-2 p-1 border rounded w-fit">
      <span className="font-semibold">[{year}]</span>
      <button
        onClick={() => changeMonth(-1)}
        className="px-1 rounded hover:bg-gray-200"
      >
        {"<"}
      </button>
      <span className="w-6 text-center">{formattedMonth}</span>
      <button
        onClick={() => changeMonth(1)}
        className="px-1 rounded hover:bg-gray-200"
      >
        {">"}
      </button>
    </div>
  );
}

export default CompactMonthPicker;