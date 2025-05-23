import React, { useEffect, useState } from "react";
import {
  fetchDetailIntro,
  fetchDetailImages,
  fetchOverview,
} from "../../../../api/course";

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
  const [overview, setOverview] = useState("");

  useEffect(() => {
    async function loadOverview() {
      if (!place?.contentid) return;
      // const overview = await fetchOverview(
      //   place.contentid,
      //   place.contenttypeid
      // );
      // const overview = await fetchOverview("126508", "12");

      console.log("✅ overview 내용:", overview); // "" or 실제 값
      setOverview(overview);
    }

    loadOverview();
  }, [place]);

  useEffect(() => {
    async function loadDetail() {
      if (!place?.contentid) return;

      const intro = await fetchDetailIntro(
        place.contentid,
        place.contenttypeid
      );
      const imgs = await fetchDetailImages(place.contentid);

      console.log("📦 원본 intro:", intro);

      // ✅ 첫 번째 객체만 저장
      setDetailInfo(Array.isArray(intro) ? intro[0] : {});
      setImages(imgs);
    }

    loadDetail();
  }, [place]);

  if (!place) return null;

  const isFood = String(place.contenttypeid) === "39";

  const handleCourseClick = () => {
    if (isCourseAdded) {
      onRemoveCourse(place.contentid);
    } else {
      onAddCourse(place.contentid);
    }
  };

  return (
    <div className="absolute top-[104px] left-[465px] w-[400px] h-[88%] bg-white shadow-lg z-50 overflow-y-auto">
      {/* 상단 */}
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-semibold">
          {isFood ? "추천 음식점" : "추천 여행지"}
        </h2>
        <button onClick={onClose}>✕</button>
      </div>

      {/* 기본 정보 */}
      <div className="p-4">
        {place.firstimage && (
          <img
            src={place.firstimage}
            alt="대표 이미지"
            className="w-full h-48 object-cover rounded mb-3"
          />
        )}
        <p className="text-lg font-bold">{place.title}</p>
        <p className="text-base ">📍 {place.addr1}</p>
        {overview ? (
          <div
            className="text-sm text-gray-600 whitespace-pre-line"
            dangerouslySetInnerHTML={{ __html: overview }}
          />
        ) : (
          <p className="text-gray-400">소개 정보 없음</p>
        )}
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
            isCourseAdded ? "bg-gray-400" : "bg-blue-400"
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
