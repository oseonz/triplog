import axios from "axios";

const API_SERVER_HOST = "http://localhost:8081";

export const checkLikesContent = async (user_id, contentid) => {
  
  try {
    const prefix = `${API_SERVER_HOST}/likes/content/check`;
  

    const res = await axios.get(prefix, {
      params: { user_id, contentid },
    });


    if(!(res?.data?.items)) return false;

    const { my_check, likes_count } = res?.data?.items || {};
    
    return {my_check, likes_count};

  } catch (err) {
    console.error("checkFavorite Error :", err);
    // return [];
  }
};


export const setLikesContent = async (user_id, contentid, contenttypeid, 
                      title, addr1, addr2, areacode, sigungucode, firstimage, mapX, mapY) => {

  const URL = `${API_SERVER_HOST}/likes/content/save`;

 
  try {
    const res = await axios.post(URL, {user_id, contentid, contenttypeid, 
                      title, addr1, addr2, areacode, sigungucode, firstimage, mapX, mapY }
    );

    const { result, message, id_name, id } = res.data;

    return result;

  } catch (err) {
    console.error("❌ setFavorites에서 catch :", err);
        const result = 'false';
    return {result};
  }
};


export const unsetLikesContent = async (user_id, contentid) => {
  try {
    const prefix = `${API_SERVER_HOST}/likes/content/delete`;
  
  const res = await axios.delete(prefix, {
      params: { user_id, contentid },
    });

    const { result, message, id_name, id } = res.data;

    return result;

  } catch (err) {
    console.error("❌ unsetLikesContent 에러:", err);
    // return [];
  }
};

export const checkLikesCourse = async (user_id, course_id) => {
  
  try {
    const prefix = `${API_SERVER_HOST}/likes/course/check`;
  

    const res = await axios.get(prefix, {
      params: { user_id, course_id },
    });


    console.log("##### ",res.data)


    if(!(res?.data?.items)) return false;

    const { my_check, likes_count } = res?.data?.items || {};
    
    return {my_check, likes_count};

  } catch (err) {
    console.error("checkLikesCourse Error :", err);
    // return [];
  }
};


export const setLikesCourse = async (user_id, course_id) => {

  const URL = `${API_SERVER_HOST}/likes/course/save`;
  
  try {
     const res = await axios.post(URL, {
      params: { user_id, course_id },
     });

    const { result, message, id_name, id } = res.data;

    return result;

  } catch (err) {
    console.error("❌ setFavorites에서 catch :", err);
        const result = 'false';
    return {result};
  }
};


export const unsetLikesCourse = async (user_id, course_id) => {
  try {
    const prefix = `${API_SERVER_HOST}/likes/course/delete`;
  
  const res = await axios.delete(prefix, {
      params: { user_id, course_id },
    });

    const { result, message, id_name, id } = res.data;

    return result;

  } catch (err) {
    console.error("❌ unsetLikesCourse 에러:", err);
    // return [];
  }
};

