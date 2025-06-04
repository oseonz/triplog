import React, { useState } from 'react';

function BigCalendar() {
    const [currentDate, setCurrentDate] = useState(new Date());

    const startOfMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1,
    );
    const endOfMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0,
    );
    const daysInMonth = endOfMonth.getDate();
    const startDay = startOfMonth.getDay();

    const prevMonth = () => {
        setCurrentDate(
            new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
        );
    };

    const nextMonth = () => {
        setCurrentDate(
            new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
        );
    };

    const renderDays = () => {
        const cells = [];
        for (let i = 0; i < startDay; i++) {
            cells.push(<div key={`empty-${i}`} className="border p-1" />);
        }
        for (let day = 1; day <= daysInMonth; day++) {
            cells.push(
                <div key={day} className="border text-center p-1">
                    {day}
                </div>,
            );
        }
        return cells;
    };

    return (
        <div className="w-screen h-[800px] box-border overflow-hidden bg-white p-4">
            <div className="flex flex-col h-full">
                <div className="flex justify-between items-center mb-2">
                    <button onClick={prevMonth}>
                        <img src="../public/images/arrowLeft.png" alt="←" />
                    </button>
                    <h2 className="text-xl font-bold">
                        {currentDate.getFullYear()}년{' '}
                        {currentDate.getMonth() + 1}월
                    </h2>
                    <button onClick={nextMonth}>
                        <img src="../public/images/arrowRight.png" alt="→" />
                    </button>
                </div>

                <div className="grid grid-cols-7 gap-[2px] text-sm">
                    {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
                        <div
                            key={day}
                            className="h-6 text-center font-semibold bg-blue-100"
                        >
                            {day}
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-7 gap-[2px] flex-1 overflow-hidden">
                    {renderDays()}
                </div>
            </div>
        </div>
    );
}

export default BigCalendar;
