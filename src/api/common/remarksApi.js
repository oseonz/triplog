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

export const listRemarks = async (contentId) => {
    console.log("-------------------- fetchDetailIntro")
    console.log("listRemarks 진입");
    const URL = `${API_SERVER_HOST}/remarks/content/list?contentid=${contentId}`;
    console.log("listRemarks url 준비");
    try {
        const res = await axios.get(URL);
            console.log("listRemarks 반환");

        const item = res.data;
        // ✅ 배열이면 첫 번째 객체만 추출

        return item;
    } catch (e) {
        console.error('❌ 상세정보 API 호출 실패', e);
        return null;
    }
};