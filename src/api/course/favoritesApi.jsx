// 🔗 찜 목록 관련 API
import axios from 'axios';

const API_SERVER_HOST = 'http://localhost:8081';

const prefix = `${API_SERVER_HOST}/favorites/list`;

export const getFavorites = async (user_id, contentid) => {
    try {
        const res = await axios.get(prefix, {
            params: { user_id, contentid },
        });
        // console.log('🎯 백에서 온 favorite 응답:', res.data);

        // items가 없으면 빈 배열 반환
        return res.data?.items || [];
    } catch (err) {
        console.error('❌ getFavorites 에러:', err);
        return [];
    }
};

export const getFavoritesType = async (user_id, contenttypeid) => {
    try {
        const res = await axios.get(prefix, {
            params: { user_id, contenttypeid },
        });
        console.log('🎯 찜 목록 응답:', res.data);
        return res.data?.items || [];
    } catch (err) {
        console.error('❌ getFavoritesByType 에러:', err);
        return [];
    }
};
