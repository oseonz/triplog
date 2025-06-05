import axios from 'axios';

const API_BASE_URL = 'http://localhost:8081'; // 또는 환경변수로 처리

export const saveCourse = async (courseData) => {
    const res = await axios.post(`${API_BASE_URL}/course/save`, courseData);
    return res.data;
};
