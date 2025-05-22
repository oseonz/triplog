import axios from "axios";

const facoriteslist = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "", // proxy 쓰면 빈 문자열
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

export const fetchFavorites = () => api.get("/favorites"); // 백엔드 FavoritesController의 @RequestMapping("/favorites")
