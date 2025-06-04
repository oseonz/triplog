// 🔗 찜 목록 관련 API
import axios from "axios";

const API_SERVER_HOST = "http://localhost:8081";

const prefix = `${API_SERVER_HOST}/favorites/list`;

export const getFavorites = async (user_id, contentid) => {

  const prefix = `${API_SERVER_HOST}/favorites/list`;

  try {
    const res = await axios.get(prefix, {
      params: { user_id, contentid },
    });

    //console.log("✅ 전체 응답 확인:", res.data); // 이거 꼭 찍어봐야 해

    // items가 없으면 빈 배열 반환
    return res.data?.items || [];
  } catch (err) {
    console.error("❌ getFavorites 에러:", err);
    return [];
  }
};


export const setFavorites = async (user_id, contentid, contenttypeid, 
                      title, addr1, addr2, areacode, sigungucode, firstimage, mapX, mapY) => {

  const URL = `${API_SERVER_HOST}/favorites/save`;

  console.log("in setFavorites : ",user_id, contentid )
  
  try {
    const res = await axios.post(URL, {user_id, contentid, contenttypeid, 
                      title, addr1, addr2, areacode, sigungucode, firstimage, mapX, mapY }
    );

    const { result, message, id_name, id } = res.data;
    console.log(contentid, result, message, id_name, id)
    return result;

  } catch (err) {
    console.error("❌ setFavorites에서 catch :", err);
        const result = 'false';
    return {result};
  }
};


export const unsetFavorite = async (user_id, contentid) => {
  try {
    const prefix = `${API_SERVER_HOST}/favorites/delete`;
  
  const res = await axios.delete(prefix, {
      params: { user_id, contentid },
    });

    const { result, message, id_name, id } = res.data;
    console.log(contentid, result, message, id_name, id)
    return result;

  } catch (err) {
    console.error("❌ getFavorites 에러:", err);
    // return [];
  }
};


export const checkFavorite = async (user_id, contentid) => {
  
  try {
    const prefix = `${API_SERVER_HOST}/favorites/check`;
  
    console.log("-----> U C ", user_id, contentid)

    const res = await axios.get(prefix, {
      params: { user_id, contentid },
    });

    console.log("res------->", res.data)
    if(!(res?.data?.items)) return false;

    const { my_check } = res?.data?.items || {};
    
    return my_check;

  } catch (err) {
    console.error("❌ getFavorites 에러:", err);
    // return [];
  }
};