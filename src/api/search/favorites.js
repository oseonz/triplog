import axios from 'axios';

export const saveFavorite = (favoriteData) => {
    return axios.post('http://localhost:8081/favorites/save', favoriteData);
};

export const checkFavorite = async (user_id, contentid) => {
    const res = await axios.get(`http://localhost:8081/favorites/check`, {
        params: { user_id, contentid },
    });
    return res.data;
};
