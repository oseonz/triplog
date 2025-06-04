import React from 'react';

function CalendarCreat() {
    return (
        <div className="w-[430px] bg-white flex flex-col z-10 shadow-md">
            <div className="flex justify-between items-center ps-6 px-3 py-8 border-b bg-white">
                <button className="text-xl font-semibold flex items-center gap-1 text-gray-800">
                    나의 캘린더
                </button>
                <div className="p-2 flex justify-center"></div>
            </div>

            <div className="border-t-[10px] border-gray-100" />
            <div className="p-4">
                <p className="font-semibold text-lg mb-2">나의 여행 코스</p>
            </div>
        </div>
    );
}

export default CalendarCreat;
