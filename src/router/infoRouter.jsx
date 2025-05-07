import EventPage from "../pages/info/EventPage";
import ArticlesPage from "../pages/info/ArticlesPage";
import IndexPage from "../pages/info/IndexPage";
import { Navigate } from "react-router-dom";

const courseRouter = () => {
  return {
    path: "/info",
    element: <IndexPage />,
    children: [
      { path: "", element: <Navigate to="event" replace /> }, // 기본 리다이렉트
      { path: "event", element: <EventPage /> },
      { path: "article", element: <ArticlesPage /> },
    ],
  };
};

export default courseRouter;
