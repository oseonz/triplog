// 🔗 좋아요 관련 API 클라이언트
import axios from "axios";

const API_SERVER_HOST = "http://localhost:8081";
const prefix = `${API_SERVER_HOST}/likes/content/`;

/**
 * ✅ [1] 좋아요 수 조회 (단건)
 * - contentid(콘텐츠 ID)를 기준으로 좋아요 수를 가져옴
 * - 예: 관광지 123의 좋아요 수
 */
export const fetchLikeCount = async (contentid) => {
  try {
    const res = await axios.get(`${prefix}view/${contentid}`);
    return res.data.likes_count ?? 0;
  } catch (err) {
    if (err.response?.status === 404) return 0; // 좋아요 없으면 0
    throw err;
  }
};

/**
 * ✅ [2] 좋아요 리스트 조회 (다건)
 * - 조건에 맞는 여러 개의 콘텐츠의 좋아요 수를 한 번에 조회
 * - 예: user_id=1인 사용자의 관광지(12번) 좋아요 목록
 */
export const fetchLikeList = async ({
  user_id,
  contenttypeid,
  areacode,
  sigungucode,
  page = 1,
  size = 100,
}) => {
  try {
    const res = await axios.get(`${prefix}check`, {
      params: {
        user_id,
        contentid,
        contenttypeid,
        areacode,
        sigungucode,
        page,
        size,
        likes_count: true,
      },
    });
    console.log("🐛 likeList 실제 값:", likeList);

    // ✅ 반드시 items 배열만 반환해야 함!
    return res.data?.items || [];
  } catch (err) {
    console.error("❌ 좋아요 리스트 조회 실패", err);
    return [];
  }
};

/**
 * ✅ [3] 좋아요 등록 또는 토글
 * - 이미 좋아요 되어 있으면 취소, 아니면 등록
 * - formData는 contentid, user_id, title 등 포함
 */
export const saveLike = async (formData) => {
  const res = await axios.post(`${prefix}save`, formData);
  return res.data;
};

/**
 * ✅ [4] 좋아요 여부 확인
 * - 특정 콘텐츠에 대해 사용자가 좋아요를 눌렀는지 boolean 반환
 */
export const checkLike = async (user_id, contentid) => {
  const res = await axios.get(`${prefix}check`, {
    params: { user_id, contentid },
  });
  return res.data.liked; // true or false
};
