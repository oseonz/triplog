import CourseBuilder from "../pages/course/CourseBuilder";
import ListPage from "../pages/course/ListPage";
import IndexPage from "../pages/course/indexPage";
import { Navigate } from "react-router-dom";

const courseRouter = () => {
  return {
    path: "/course",
    element: <IndexPage />,
    children: [
      { path: "", element: <Navigate to="list" replace /> }, // 기본 리다이렉트
      { path: "list", element: <ListPage /> },
      { path: "builder", element: <CourseBuilder /> },
    ],
  };
};

export default courseRouter;
