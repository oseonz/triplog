import React from "react";

function DetailPanel({
  selectedPlace,
  onClose,
  onAddCourse,
  comment,
  setComment,
  onCommentSubmit,
}) {
  if (!selectedPlace) return null;

  const isFood = String(selectedPlace.contenttypeid) === "39";

  return (
    <div
      className={`
        absolute top-0 left-[460px] w-[400px] h-full bg-white shadow-lg z-50
        transition-transform duration-300 ease-in-out
        ${
          selectedPlace
            ? "translate-x-0"
            : "-translate-x-[440px] opacity-0 pointer-events-none"
        }
      `}
    >
      {/* 상단 타이틀 + 닫기 버튼 */}
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-bold">
          {isFood ? "추천 음식점" : "추천 여행지"}
        </h2>
        <button onClick={onClose} className="text-xl">
          ✕
        </button>
      </div>

      {/* 내용 */}
      <div className="p-4 text-sm overflow-y-auto h-[calc(100%-60px)]">
        {/* 대표 이미지 */}
        {selectedPlace.firstimage && (
          <img
            src={selectedPlace.firstimage}
            alt={selectedPlace.title}
            className="w-full h-48 object-cover rounded mb-4"
          />
        )}

        <p className="text-lg font-bold mb-2">{selectedPlace.title}</p>
        <p className="text-gray-700 mb-2">📍 주소: {selectedPlace.addr1}</p>

        {isFood ? (
          <>
            <p>
              운영시간:{" "}
              <span
                dangerouslySetInnerHTML={{
                  __html: selectedPlace.opentimefood || "정보 없음",
                }}
              />
            </p>
            <p>
              <strong>휴무일:</strong>{" "}
              {selectedPlace.restdatefood || "정보 없음"}
            </p>
            <p>
              <strong>대표 메뉴:</strong>{" "}
              {selectedPlace.treatmenu || "정보 없음"}
            </p>
            <p>
              <strong>주차:</strong> {selectedPlace.parkingfood || "정보 없음"}
            </p>
            <p>
              <strong>신용카드:</strong>{" "}
              {selectedPlace.chkcreditcardfood || "정보 없음"}
            </p>
          </>
        ) : (
          <>
            <p>
              <strong>문의 및 안내:</strong>{" "}
              {selectedPlace.infocenter || "정보 없음"}
            </p>
            <p>
              <strong>휴무일:</strong> {selectedPlace.restdate || "정보 없음"}
            </p>
            <p>
              <strong>이용시간:</strong> {selectedPlace.usetime || "정보 없음"}
            </p>
            <p>
              <strong>주차:</strong> {selectedPlace.parking || "정보 없음"}
            </p>
          </>
        )}

        {/* ➕ 코스 추가 버튼 */}
        <button
          onClick={onAddCourse}
          className="w-full mt-4 bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          ➕ 코스에 추가
        </button>

        {/* 💬 댓글 입력 */}
        <div className="mt-6">
          <p className="text-sm font-semibold mb-1">💬 트립톡톡</p>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full border rounded p-2 h-24 mb-2 resize-none"
            placeholder="댓글을 입력하세요"
          />
          <button
            onClick={onCommentSubmit}
            className="w-full bg-gray-800 text-white py-2 rounded hover:bg-black"
          >
            댓글 등록
          </button>
        </div>
      </div>
    </div>
  );
}

export default DetailPanel;
