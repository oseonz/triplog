import IndexPage from "../pages/info/IndexPage";
import { Navigate } from "react-router-dom";
import MyCourses from "../pages/mypage/MyCourses";
import MyBookmarks from "../pages/mypage/MyBookmarks";
import MyActivitys from "../pages/mypage/MyActivitys";
import MyPageMain from "../pages/mypage/MyPageMain";

const mypageRouter = () => {
  return {
    path: "/mypage",
    children: [
      { path: "", element: <MyPageMain /> }, // 기본 리다이렉트
      { path: "mypage_course", element: <MyCourses /> },
      { path: "mypage_bookmark", element: <MyBookmarks /> },
      { path: "mypage_activity", element: <MyActivitys /> },
    ],
  };
};

export default mypageRouter;
