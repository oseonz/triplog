// src/api/favoritesApi.js
import axios from "axios";

const favoritesApi = axios.create({
  baseURL: "", // proxy 쓰면 빈 문자열
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

/**
 * 찜목록 조회
 * @param {object} params
 * @param {string|number} params.user_id         – 사용자 ID
 * @param {string|number} params.contenttypeid   – 콘텐츠 타입 ID (39: 음식점, 12: 관광지 등)
 * @param {string|number} [params.areacode]      – 지역 코드
 * @param {string|number} [params.sigungucode]   – 시군구 코드
 * @returns {Promise<any>}                       – 응답 데이터
 */
export const fetchFavorites = (params) =>
  favoritesApi
    .get("/favorites/list", {
      params: {
        user_id: params.user_id,
        contenttypeid: params.contenttypeid,
        // 필요하다면 추가 파라미터도 여기에 넣으세요:
        // areacode: params.areacode,
        // sigungucode: params.sigungucode,
      },
    })
    .then((res) => {
      console.log("🧾 API 응답 구조:", res.data);
      return res.data.items; // ✅ 여기서 .items가 반드시 존재해야 함
    });
