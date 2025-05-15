import React from "react";
import { fetchDetailImages } from "../api/course";
import { useEffect, useState } from "react";

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
  const [images, setImages] = useState([]);

  // // 공유 버튼 핸들러
  // const handleShare = () => {
  //   const shareUrl = window.location.href;

  //   // 1️⃣ Web Share API 지원 여부 확인
  //   if (navigator.share) {
  //     navigator
  //       .share({
  //         title: selectedPlace.title || "트립로그",
  //         text: `추천 여행지: ${selectedPlace.title || ""}`,
  //         url: shareUrl,
  //       })
  //       .then(() => console.log("✅ 공유 완료"))
  //       .catch((err) => console.warn("❌ 공유 실패:", err));
  //   } else {
  //     // 2️⃣ 클립보드 복사 fallback
  //     navigator.clipboard
  //       .writeText(shareUrl)
  //       .then(() => alert("📋 링크가 복사되었습니다!"))
  //       .catch((err) => console.error("❌ 링크 복사 실패:", err));
  //   }
  // };

  useEffect(() => {
    async function getImages() {
      if (selectedPlace?.contentid) {
        const imageList = await fetchDetailImages(selectedPlace.contentid);
        setImages(imageList);
      }
    }

    getImages();
  }, [selectedPlace?.contentid]);

  return (
    <div
      className={`
        absolute top-[104px] left-[460px] w-[400px] h-full bg-white shadow-lg z-50
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
        <h2 className="text-lg font-semibold">
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
            className="w-full h-48 object-cover rounded mb-3"
          />
        )}

        <p className="text-lg font-semibold pb-2"> {selectedPlace.title}</p>
        <p>
          <span className=" font-normal">📍 주소:</span>
          {selectedPlace.addr1}
        </p>

        {isFood ? (
          <>
            <p>
              🕒 운영시간:{" "}
              <span
                className="font-normal"
                dangerouslySetInnerHTML={{
                  __html: selectedPlace.opentimefood || "정보 없음",
                }}
              />
            </p>
            <p>
              <span className="font-normal">🍽 대표 메뉴</span>
              <br /> {selectedPlace.treatmenu || "정보 없음"}
            </p>
            <p>
              <span className="font-normal">❌ 휴무일:</span>{" "}
              {selectedPlace.restdatefood || "정보 없음"}
            </p>
            <p>
              <span className="font-normal">🚗 주차:</span>{" "}
              {selectedPlace.parkingfood || "정보 없음"}
            </p>
            <p>
              <span className="font-normal">💳 신용카드:</span>{" "}
              {selectedPlace.chkcreditcardfood || "정보 없음"}
            </p>
          </>
        ) : (
          <>
            <p>
              <span className="font-normal">📞 문의 및 안내:</span>{" "}
              {selectedPlace.infocenter || "정보 없음"}
            </p>
            <p>
              <span className="font-normal">❌ 휴무일:</span>{" "}
              {selectedPlace.restdate || "정보 없음"}
            </p>
            <p>
              <span className="font-normal">🕒 이용시간:</span>{" "}
              {selectedPlace.usetime || "정보 없음"}
            </p>
            <p>
              <span className="font-normal">🚗 주차:</span>{" "}
              {selectedPlace.parking || "정보 없음"}
            </p>
          </>
        )}

        {/* 이미지 갤러리 표시 */}
        <div className="grid grid-cols-2 gap-2 justify-items-center mt-4">
          {images.map((img, idx) => (
            <img
              key={idx}
              src={img.smallimageurl || img.originimgurl}
              alt={`여행지 이미지 ${idx + 1}`}
              className="rounded-lg object-cover  w-40 h-28"
            />
          ))}
        </div>

        {/* ➕ 코스 추가 버튼 */}
        <button
          onClick={onAddCourse}
          className="w-full mt-4 bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          ➕ 코스에 추가
        </button>

        {/* 💬 댓글 입력 */}
        <div className="mt-6">
          <p className="text-sm font-semibold mb-1">💬 로그톡톡</p>
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
