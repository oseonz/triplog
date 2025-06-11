import { useState } from 'react';

export default function TripNote({ notedata, handleChange }) {
    const handleSave = () => {
        console.log('📝 저장된 여행노트:', note);
        alert('여행노트가 저장되었습니다!');
    };

    return (
        <div className="w-full h-full flex flex-col bg-white">
            <div className=" px-3 py-3">
                <div className="border p-4 bg-blue-50 rounded-md shadow-sm space-y-3">
                    {/* <p className="text-sm text-gray-700">
                        여행에 필요한 정보를 입력하세요.
                    </p> */}
                    <div className="space-y-2 text-sm text-gray-800">
                        <div>
                            <label className="block font-semibold">
                                일정 :
                            </label>
                            <textarea
                                name="schedule"
                                value={notedata.schedule}
                                onChange={handleChange}
                                rows={2}
                                className="w-full p-1 border rounded resize-none"
                                placeholder=""
                            />
                        </div>
                        <div>
                            <label className="block font-semibold">
                                교통편 :
                            </label>
                            <textarea
                                name="transport"
                                value={notedata.transport}
                                onChange={handleChange}
                                rows={3}
                                className="w-full p-1 border rounded resize-none"
                                placeholder=""
                            />
                        </div>
                        <div>
                            <label className="block font-semibold">
                                예산 :
                            </label>
                            <textarea
                                name="budget"
                                value={notedata.budget}
                                onChange={handleChange}
                                rows={3}
                                className="w-full p-1 border rounded resize-none"
                                placeholder=""
                            />
                        </div>
                        <div>
                            <label className="block font-semibold">
                                숙박 :
                            </label>
                            <textarea
                                name="stay"
                                value={notedata.stay}
                                onChange={handleChange}
                                rows={3}
                                className="w-full p-1 border rounded resize-none"
                                placeholder=""
                            />
                        </div>
                        <div>
                            <label className="block font-semibold">
                                메모 :
                            </label>
                            <textarea
                                name="memo"
                                value={notedata.memo}
                                onChange={handleChange}
                                rows={3}
                                className="w-full p-1 border rounded resize-none"
                                placeholder=""
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* <div className="px-6 py-2">
                <button
                    onClick={handleSave}
                    className="ml-auto block px-4 py-2 bg-blue-500 rounded text-sm text-white"
                >
                    저장하기
                </button>
            </div> */}
        </div>
    );
}
