import { createBrowserRouter } from "react-router-dom";
import MainPage from "../pages/MainPage";
import IntroPage from "../pages/intro/IntroPage";
import LoginPage from "../pages/auth/LoginPage";
// import courseRouter from "./courseRouter";
import SearchMainPage from "../pages/search/SearchMainPage";
import PlannerMainPage from "../pages/course/PlannerMainPage";
import InfoMainPage from "../pages/info/InfoMainPage";
import JoinPage from "../pages/auth/JoinPage";
import IndexPage from "../pages/course/indexPage";
import courseRouter from "./courseRouter";

const root = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/Join",
    element: <JoinPage />,
  },
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/intro",
    element: <IntroPage />,
  },
  {
    path: "/search",
    element: <SearchMainPage />,
  },
  {
    path: "/course",
    element: <IndexPage />,
  },
  {
    path: "/info",
    element: <InfoMainPage />,
  },
]);

export default root;
