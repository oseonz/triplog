import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [reactRefresh()],
  server: {
    proxy: {
      // /api로 시작하는 요청을 백엔드 8081로 포워딩
      "^/api/.*": {
        target: "http://localhost:8081",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      // 만약 /favorites처럼 맨 앞 슬래시만 붙여서 쓰고 싶으면:
      "/favorites": {
        target: "http://localhost:8081",
        changeOrigin: true,
      },
    },
  },
});
