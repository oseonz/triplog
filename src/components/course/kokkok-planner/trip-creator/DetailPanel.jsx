import React, { useEffect, useState } from "react";
import { fetchDetailIntro, fetchDetailImages } from "../../../../api/course";

function DetailPanel({
  selectedPlace,
  onClose,
  onAddCourse,
  comment,
  setComment,
  onCommentSubmit,
}) {
  const [detailInfo, setDetailInfo] = useState({});
  const [images, setImages] = useState([]);

  useEffect(() => {
    async function loadDetail() {
      if (!selectedPlace?.contentid) return;

      const intro = await fetchDetailIntro(
        selectedPlace.contentid,
        selectedPlace.contenttypeid
      );
      const imgs = await fetchDetailImages(selectedPlace.contentid);

      setDetailInfo(intro);
      setImages(imgs);
    }

    loadDetail();
  }, [selectedPlace]);

  if (!selectedPlace) return null;

  const isFood = String(selectedPlace.contenttypeid) === "39";

  return (
    <div className="absolute top-[104px] left-[460px] w-[400px] h-full bg-white shadow-lg z-50 overflow-y-auto">
      {/* 상단 */}
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-semibold">
          {isFood ? "추천 음식점" : "추천 여행지"}
        </h2>
        <button onClick={onClose}>✕</button>
      </div>

      {/* 기본 정보 */}
      <div className="p-4">
        {selectedPlace.firstimage && (
          <img
            src={selectedPlace.firstimage}
            alt="대표 이미지"
            className="w-full h-48 object-cover rounded mb-3"
          />
        )}
        <p className="text-lg font-bold">{selectedPlace.title}</p>
        <p className="text-sm mb-2">📍 {selectedPlace.addr1}</p>

        {/* 상세 intro 정보 */}
        {isFood ? (
          <>
            <p>🕒 운영시간: {detailInfo?.opentimefood || "정보 없음"}</p>
            <p>🍽 대표 메뉴: {detailInfo?.treatmenu || "정보 없음"}</p>
            <p>❌ 휴무일: {detailInfo?.restdatefood || "정보 없음"}</p>
            <p>🚗 주차: {detailInfo?.parkingfood || "정보 없음"}</p>
          </>
        ) : (
          <>
            <p>📞 안내: {detailInfo?.infocenter || "정보 없음"}</p>
            <p>🕒 이용시간: {detailInfo?.usetime || "정보 없음"}</p>
            <p>❌ 휴무일: {detailInfo?.restdate || "정보 없음"}</p>
            <p>🚗 주차: {detailInfo?.parking || "정보 없음"}</p>
          </>
        )}

        {/* 서브 이미지 */}
        {images.length > 0 && (
          <div className="grid grid-cols-2 gap-2 my-3">
            {images.map((img, idx) => (
              <img
                key={idx}
                src={img.smallimageurl || img.originimgurl}
                alt={`서브이미지 ${idx + 1}`}
                className="rounded-lg object-cover"
              />
            ))}
          </div>
        )}

        {/* 코스에 추가 버튼 */}
        <button
          onClick={onAddCourse}
          className="mt-3 w-full bg-blue-500 text-white py-2 rounded"
        >
          ➕ 코스에 추가
        </button>

        {/* 댓글창 */}
        <div className="mt-5">
          <p className="text-sm font-semibold">💬 트립톡톡</p>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full border rounded p-2 mt-1 h-24 resize-none"
            placeholder="댓글을 입력하세요"
          />
          <button
            onClick={onCommentSubmit}
            className="mt-2 w-full bg-gray-800 text-white py-2 rounded"
          >
            댓글 등록
          </button>
        </div>
      </div>
    </div>
  );
}

export default DetailPanel;
