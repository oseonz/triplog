import { useState } from "react";

function Calendar() {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(new Date(today));

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const goToPreviousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const goToNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const days = [];
  for (let i = 0; i < firstDay; i++) {
    days.push(null); // 빈 칸
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  return (
    <div className="flex justify-between items-center">
      <div>
        <button
          onClick={goToPreviousMonth}
          className="px-2 py-1 text-sm rounded"
        >
          <img src="../public/images/arrowLeft.png" alt="" />
        </button>
      </div>
      <div>
        <div className="flex justify-center items-center mb-4">
          {/* <button
          onClick={goToPreviousMonth}
          className="px-2 py-1 text-sm bg-gray-200 rounded"
        >
          이전
        </button> */}
          <h2 className="text-lg font-bold">
            {year}년 {month + 1}월
          </h2>
          {/* <button
          onClick={goToNextMonth}
          className="px-2 py-1 text-sm bg-gray-200 rounded"
        >
          다음
        </button> */}
        </div>
        <div className="grid grid-cols-7 gap-2 text-center">
          {["일", "월", "화", "수", "목", "금", "토"].map((day, idx) => (
            <div key={idx} className="font-bold">
              {day}
            </div>
          ))}
          {days.map((day, idx) => (
            <div
              key={idx}
              className="h-12 w-12 flex items-center justify-center rounded"
            >
              {day ? day : ""}
            </div>
          ))}
        </div>
      </div>

      <div>
        <button onClick={goToNextMonth} className="px-2 py-1 text-sm rounded">
          <img src="../public/images/arrowRight.png" alt="" />
        </button>
      </div>
    </div>
  );
}

export default Calendar;
