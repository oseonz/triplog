import { useState } from "react";

export default function TripNote() {
  const [note, setNote] = useState({
    schedule: "",
    transport: "",
    budget: "",
    stay: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNote((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    console.log("📝 저장된 여행노트:", note);
    alert("여행노트가 저장되었습니다!");
  };

  return (
    <div className="w-full h-full flex flex-col bg-white">
      <div className=" px-6 py-4">
        <div className="border p-4 bg-blue-50 rounded-md shadow-sm space-y-3">
          <p className="text-sm text-gray-700">
            여행에 필요한 정보를 입력하세요.
            <br />
            코스 세부내용을 작성하세요.
          </p>
          <div className="space-y-2 text-sm text-gray-800">
            <div>
              <label className="block font-semibold">일정 :</label>
              <input
                type="text"
                name="schedule"
                value={note.schedule}
                onChange={handleChange}
                className="w-full p-1 border rounded"
                placeholder="예: 5월 15일 ~ 5월 18일"
              />
            </div>
            <div>
              <label className="block font-semibold">교통편 :</label>
              <input
                type="text"
                name="transport"
                value={note.transport}
                onChange={handleChange}
                className="w-full p-1 border rounded"
                placeholder="예: KTX, 렌터카"
              />
            </div>
            <div>
              <label className="block font-semibold">예산 :</label>
              <input
                type="text"
                name="budget"
                value={note.budget}
                onChange={handleChange}
                className="w-full p-1 border rounded"
                placeholder="예: 30만원"
              />
            </div>
            <div>
              <label className="block font-semibold">숙박 :</label>
              <textarea
                name="stay"
                value={note.stay}
                onChange={handleChange}
                rows={3}
                className="w-full p-1 border rounded resize-none"
                placeholder="예: 호텔, 게스트하우스"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-2">
        <button
          onClick={handleSave}
          className="ml-auto block px-4 py-2 bg-blue-500 rounded text-sm text-white"
        >
          저장하기
        </button>
      </div>
    </div>
  );
}
