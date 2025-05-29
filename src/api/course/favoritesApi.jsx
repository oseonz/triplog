// 🔗 찜 목록 관련 API
import axios from "axios";

const API_SERVER_HOST = "http://localhost:8081";
const prefix = `${API_SERVER_HOST}/favorites/list`;

export const fetchFavorites = async ({ user_id, contenttypeid }) => {
  try {
    const res = await axios.get(prefix, {
      params: {
        user_id,
        contenttypeid,
      },
    });
    return res.data?.items || []; // or res.data if no `items` wrapping
  } catch (err) {
    console.error("❌ 찜 목록 불러오기 실패", err);
    throw err;
  }
};

// const favoritesApi = axios.create({
//   baseURL: "", // 프록시 사용 시 빈 문자열 유지
//   withCredentials: true,
//   headers: { "Content-Type": "application/json" },
// });

/**
 * ✅ 찜 목록 조회 (관광지/음식점)
 * - user_id + contenttypeid(12 or 39)를 기준으로 찜한 항목 리스트 조회
 * - 선택적으로 areacode, sigungucode를 필터로 줄 수 있음
 */

// ✅ 찜 목록 조회 (관광지/음식점) - Recoil 통일 리팩토링
// export const fetchFavorites = async ({
//   user_id,
//   contenttypeid,
//   areacode,
//   sigungucode,
// }) => {
//   try {
//     const res = await favoritesApi.get("/favorites/list", {
//       params: {
//         user_id,
//         contenttypeid,
//         areacode,
//         sigungucode,
//       },
//     });

//     // ✅ 응답에 items가 없다면 빈 배열로 처리
//     return res.data?.items || [];
//   } catch (err) {
//     console.error("❌ 찜 목록 불러오기 실패", err);
//     return [];
//   }
// };
