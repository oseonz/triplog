import axios from "axios";

const API_SERVER_HOST = "http://localhost:8081";

export const saveRemark = async (user_id, contentid, contenttypeid, 
                      title, addr1, addr2, areacode, sigungucode, firstimage, mapX, mapY, comment) => {

  const URL = `${API_SERVER_HOST}/remarks/content/save`;

 
  try {
    const res = await axios.post(URL, {user_id, contentid, contenttypeid, 
                      title, addr1, addr2, areacode, sigungucode, firstimage, mapX, mapY, comment }
    );

    const { result, message, id_name, id } = res.data;

    console.log("saveRemark", res.data);
    return result;

  } catch (err) {
    console.error("❌ saveRemark에서 catch :", err);
        const result = 'false';
    return {result};
  }
};