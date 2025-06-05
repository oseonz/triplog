import React from 'react';

function CalendarInfo() {
    const travelCourses = [
        '서울 당일치기 여행',
        '부산 야경 투어',
        '제주도 2박 3일 코스',
    ];

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
                <ul className="list-decimal list-inside space-y-4">
                    {travelCourses.length > 0 ? (
                        travelCourses.map((course, index) => (
                            <li key={index} className="text-gray-700">
                                {course}
                            </li>
                        ))
                    ) : (
                        <p className="text-gray-500">저장된 코스가 없습니다.</p>
                    )}
                </ul>
            </div>
        </div>
    );
}

export default CalendarInfo;
