import axios from "axios";

const API_SERVER_HOST = "http://localhost:8081";

const prefix = `${API_SERVER_HOST}/likes/content/`;

export const getOne = async (contentid) => {
  const res = await axios.get(`${prefix}view/${contentid}`);
  return res.data;
};

export const getList = async (params) => {
  const {
    user_id,
    areacode,
    contenttypeid,
    sigungucode,
    likes_count,
    page,
    size,
  } = params;

  const res = await axios.get(`${prefix}list`, {
    params: {
      user_id: user_id,
      areacode: areacode,
      contenttypeid: contenttypeid,
      sigungucode: sigungucode,
      likes_count: likes_count,
      page: page,
      size: size,
    },
  });
  return res.data;
};

// 좋아요 등록 or 토글
// export const saveLike = async (formData) => {
//   const res = await axios.post(
//     "http://localhost:8081/likes/content/save",
//     formData
//   );
//   return res.data;
// };

// 좋아요 수 조회
// export const fetchLikeCount = async (contentid) => {
//   try {
//     const res = await axios.get(`${prefix}view/${Number(contentid)}`);
//     return res.data.likes_count ?? 0;
//   } catch (err) {
//     if (err.response?.status === 404) {
//       return 0; // 👍 좋아요 없을 경우 0으로
//     }
//     throw err;
//   }
// };

// ✅ 좋아요 여부 확인 (boolean)
export const checkLike = async (user_id, contentid) => {
  const res = await axios.get(`${prefix}check`, {
    params: { user_id, contentid },
  });
  return res.data.liked; // 또는 res.data.result, 응답 형식에 따라
};
