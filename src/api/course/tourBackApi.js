import axios from 'axios';

const API_BASE_URL = 'http://localhost:8081'; // 또는 환경변수로 처리

export const saveCourse = async (courseData) => {
    const res = await axios.post(`${API_BASE_URL}/course/save`, courseData);
    return res.data;
};

export const saveFavorite = (payload) => {
    return axios.post('http://localhost:8081/favorites/save', payload);
};

export const deleteFavorite = (user_id, contentid) => {
    return axios.delete(
        `http://localhost:8081/favorites/delete?user_id=${user_id}&contentid=${contentid}`,
    );
};

export const postLike = async (data) => {
    return axios.post('http://localhost:8081/likes/content/save', data);
};
export const deleteLike = async (user_id, contentid) => {
    return axios.delete(
        `http://localhost:8081/likes/content/delete?user_id=${user_id}&contentid=${contentid}`,
    );
};

export const fetchMyCourses = async (userId) => {
    try {
        const response = await axios.get('http://localhost:8081/course/list', {
            params: {
                creator_user_id: userId,
            },
        });

        return response.data.items; // API 응답 중 items 배열만 반환
    } catch (error) {
        console.error('❌ 코스 목록 불러오기 실패:', error);
        return [];
    }
};
