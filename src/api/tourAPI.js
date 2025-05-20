// src/api/tourApi.js
import axios from "axios";

export const fetchTours = async () => {
  try {
    const response = await axios.get(
      "http://localhost:8081/likes/content/check"
    );
    return response.data;
  } catch (error) {
    console.error("tourAPI 불러오기 실패!:", error);
    throw error;
  }
};
