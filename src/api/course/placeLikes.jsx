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

  //console.log(res.data.items);
  return res.data.items; // true or false
};

// hanyong5추가
export const getLikes = async (contentid) => {
  const res = await axios.get(`${prefix}list`, {
    params: { contentid },
  });

  return res.data.items.content[0].likes_count;
};
