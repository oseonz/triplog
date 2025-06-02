import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import {
  fetchDetailIntroNew,
  fetchDetailImages,
} from "../../../../api/course/tourSearchApi";

function DetailPanel({
  place,
  onClose,
  onAddCourse,
  comment,
  setComment,
  onCommentSubmit,
  onRemoveCourse,
  isCourseAdded,
}) {
  const [detailInfo, setDetailInfo] = useState({});
  const [images, setImages] = useState([]);
  const selectedPlace = useRecoilValue(detailIntro);

  useEffect(() => {
    async function loadDetail() {
      if (!selectedPlace?.contentid) return;

      const intro = await fetchDetailIntro(
        selectedPlace.contentid,
        selectedPlace.contenttypeid
      );
      const imgs = await fetchDetailImages(selectedPlace.contentid);

      setDetailInfo(Array.isArray(intro) ? intro[0] : {});
      setImages(Array.isArray(imgs) ? imgs : []);
    }

    loadDetail();
  }, [selectedPlace]); // ✅ selectedPlace만 의존성으로 둠

  if (!selectedPlace) return null;

  const isFood = String(selectedPlace.contenttypeid) === "39";

  const handleCourseClick = () => {
    if (isCourseAdded) {
      onRemoveCourse(selectedPlace.contentid);
    } else {
      onAddCourse(selectedPlace.contentid);
    }
  };

  return (
    <div className="absolute top-[95px] left-[445px] w-[400px] h-[88%] bg-white shadow-lg z-50 overflow-y-auto">
      {/* 상단 */}
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-semibold">
          {isFood ? "음식점" : "여행지"}
        </h2>
        <button
          onClick={() => {
            onClose(); // ✅ 패널 닫기
          }}
        >
          ✕
        </button>
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
        <p className="text-base ">📍 {selectedPlace.addr1}</p>
        <p>{selectedPlace.overview || "상세 설명이 없습니다."}</p>

        {/* 상세 intro 정보 */}
        {isFood ? (
          <>
            {detailInfo?.opentimefood?.trim() ? (
              <p>🕒 운영시간: {detailInfo.opentimefood}</p>
            ) : (
              <p className="text-gray-400">🕒 운영시간: 정보 없음</p>
            )}
            {detailInfo?.treatmenu?.trim() ? (
              <p>🍽 대표 메뉴: {detailInfo.treatmenu}</p>
            ) : (
              <p className="text-gray-400">🍽 대표 메뉴: 정보 없음</p>
            )}
            {detailInfo?.restdatefood?.trim() ? (
              <p>❌ 휴무일: {detailInfo.restdatefood}</p>
            ) : (
              <p className="text-gray-400">❌ 휴무일: 정보 없음</p>
            )}
            {detailInfo?.parkingfood?.trim() ? (
              <p>🚗 주차: {detailInfo.parkingfood}</p>
            ) : (
              <p className="text-gray-400">🚗 주차: 정보 없음</p>
            )}
          </>
        ) : (
          <>
            {/* 여행지용 필드 예시 */}
            {detailInfo?.infocenter ? (
              <p>📞 안내: {detailInfo.infocenter}</p>
            ) : (
              <p className="text-gray-400">📞 안내: 정보 없음</p>
            )}

            {detailInfo?.usetime ? (
              <p>🕒 이용시간: {detailInfo.usetime}</p>
            ) : (
              <p className="text-gray-400">🕒 이용시간: 정보 없음</p>
            )}

            {detailInfo?.restdate ? (
              <p>❌ 휴무일: {detailInfo.restdate}</p>
            ) : (
              <p className="text-gray-400">❌ 휴무일: 정보 없음</p>
            )}

            {detailInfo?.parking ? (
              <p>🚗 주차: {detailInfo.parking}</p>
            ) : (
              <p className="text-gray-400">🚗 주차: 정보 없음</p>
            )}
          </>
        )}

        {/* 서브 이미지 */}
        {images.length > 0 && (
          <div className="grid grid-cols-2 gap-2 mt-4 justify-items-center ">
            {images.map((img, idx) => (
              <img
                key={idx}
                src={img.smallimageurl || img.originimgurl}
                alt={`서브이미지 ${idx + 1}`}
                className="rounded-lg object-cover  w-40 h-28"
              />
            ))}
          </div>
        )}

        {/* ✅ 코스에 추가/취소 버튼 */}
        <button
          onClick={handleCourseClick}
          className={`mt-3 w-full py-2 rounded text-white ${
            isCourseAdded ? "bg-gray-400" : "bg-blue-500"
          }`}
        >
          {isCourseAdded ? "✔ 코스 취소하기" : "➕ 코스에 추가"}
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
            className="mt-2 w-full bg-blue-500 text-white py-2 rounded"
          >
            댓글 등록
          </button>
        </div>
      </div>
    </div>
  );
}

export default DetailPanel;
