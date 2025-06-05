import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const COLORS = ['#FFBABB', '#FFEDBA', '#BADAFF', '#D1BAFF'];

function CalendarCreat() {
    const [visible, setVisible] = useState(true);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [selectedColor, setSelectedColor] = useState(COLORS[0]);
    const [colorPickerOpen, setColorPickerOpen] = useState(false);

    if (!visible) return null;

    return (
        <div className="w-[430px] bg-white flex flex-col z-10 shadow-md relative">
            <div className="border-t-[10px] border-gray-100" />
            <div className="p-4 flex justify-between items-center">
                <p className="font-semibold text-lg">새로운 일정</p>
                <button
                    className="text-xl text-gray-500 hover:text-black"
                    onClick={() => setVisible(false)}
                >
                    ✕
                </button>
            </div>

            {/* 일정 입력 */}
            <div className="px-4 pb-5">
                <p className="pb-2">일정</p>
                <input
                    type="text"
                    placeholder="일정을 입력하세요"
                    className="p-2 border w-full"
                />
            </div>

            {/* 설명 */}
            <div className="px-4 pb-5">
                <p className="pb-2">설명</p>
                <textarea
                    placeholder="설명을 입력하세요"
                    className="p-2 border w-full h-[100px] resize-none align-top"
                />
            </div>

            {/* 날짜 */}
            <div className="px-4 pb-5">
                <p className="pb-2">날짜</p>
                <hr className="p-2" />
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                        <p className="text-sm w-[50px]">시작일</p>
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            dateFormat="yyyy-MM-dd"
                            placeholderText="날짜 선택"
                            className="border p-2"
                        />
                    </div>
                    <div className="flex items-center gap-3">
                        <p className="text-sm w-[50px]">종료일</p>
                        <DatePicker
                            selected={endDate}
                            onChange={(date) => setEndDate(date)}
                            dateFormat="yyyy-MM-dd"
                            placeholderText="날짜 선택"
                            className="border p-2"
                        />
                    </div>

                    {/* 색상 선택 */}
                    <div className="flex items-center gap-3 relative">
                        <p className="text-sm w-[50px]">색상</p>
                        <div
                            className="border p-1 rounded cursor-pointer flex"
                            onClick={() => setColorPickerOpen(!colorPickerOpen)}
                        >
                            <div
                                className="rounded-full w-[20px] h-[20px]"
                                style={{ backgroundColor: selectedColor }}
                            ></div>
                        </div>

                        {colorPickerOpen && (
                            <div className="absolute top-10 left-[60px] flex gap-2 bg-white border rounded shadow p-2 z-50">
                                {COLORS.map((color, index) => (
                                    <div
                                        key={index}
                                        className="w-6 h-6 rounded-full cursor-pointer border border-gray-300"
                                        style={{ backgroundColor: color }}
                                        onClick={() => {
                                            setSelectedColor(color);
                                            setColorPickerOpen(false);
                                        }}
                                    ></div>
                                ))}
                            </div>
                        )}
                    </div>

                    <button className="mt-6 bg-blue-500 text-white py-3 px-4 rounded">
                        일정 생성하기
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CalendarCreat;
