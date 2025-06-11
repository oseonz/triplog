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

export const setFavorites = async (
    user_id,
    contentid,
    contenttypeid,
    title,
    addr1,
    addr2,
    areacode,
    sigungucode,
    firstimage,
    mapx,
    mapy,
) => {
    const URL = `${API_SERVER_HOST}/favorites/save`;

    try {
        const res = await axios.post(URL, {
            user_id,
            contentid,
            contenttypeid,
            title,
            addr1,
            addr2,
            areacode,
            sigungucode,
            firstimage,
            mapx,
            mapy,
        });

        const { result, message, id_name, id } = res.data;

        return result;
    } catch (err) {
        console.error('❌ setFavorites에서 catch :', err);
        const result = 'false';
        return { result };
    }
};

export const unsetFavorite = async (user_id, contentid) => {
    try {
        const prefix = `${API_SERVER_HOST}/favorites/delete`;

        const res = await axios.delete(prefix, {
            params: { user_id, contentid },
        });

        const { result, message, id_name, id } = res.data;

        return result;
    } catch (err) {
        console.error('❌ getFavorites 에러:', err);
        // return [];
    }
};

export const checkFavorite = async (user_id, contentid) => {
    try {
        const prefix = `${API_SERVER_HOST}/favorites/check`;

        const res = await axios.get(prefix, {
            params: { user_id, contentid },
        });

        console.log('checkFavorite : ', res.data);

        if (!res?.data?.items) return false;

        const { my_check } = res?.data?.items || {};

        return my_check;
    } catch (err) {
        console.error('❌ getFavorites 에러:', err);
        // return [];
    }
};
