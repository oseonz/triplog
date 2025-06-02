// 🔗 찜 목록 관련 API
import axios from 'axios';

const API_SERVER_HOST = 'http://localhost:8081';

const prefix = `${API_SERVER_HOST}/favorites/list`;

export const getFavorites = async (user_id, contentid) => {
    try {
        const res = await axios.get(prefix, {
            params: { user_id, contentid },
        });

        //console.log("✅ 전체 응답 확인:", res.data); // 이거 꼭 찍어봐야 해

        // items가 없으면 빈 배열 반환
        return res.data?.items || [];
    } catch (err) {
        console.error('❌ getFavorites 에러:', err);
        return [];
    }
};
