import { createBrowserRouter } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import IntroPage from '../pages/intro/IntroPage';
import LoginPage from '../pages/auth/LoginPage';
// import PlannerMainPage from "../pages/course/PlannerMainPage";
import JoinPage from '../pages/auth/JoinPage';
import courseRouter from './courseRouter';
import searchRouter from './searchRouter';
import infoRouter from './infoRouter';
import mypageRouter from './mypageRouter';
import DetailPage from '../pages/search/DetailPage';

const root = createBrowserRouter([
    {
        path: '/login',
        element: <LoginPage />,
    },
    {
        path: '/Join',
        element: <JoinPage />,
    },
    {
        path: '/',
        element: <MainPage />,
    },
    {
        path: '/intro',
        element: <IntroPage />,
    },
    { path: 'detail/:contentid', element: <DetailPage /> },

    searchRouter(),
    // {
    //   path: "/search",
    //   element: <SearchMainPage />,
    // },v
    courseRouter(),
    // {
    //   path: "/info",
    //   element: <InfoMainPage />,
    // },
    infoRouter(),
    // {
    //   path: "/mypage",
    //   element: <MyPageMain />,
    // },
    mypageRouter(),
]);

export default root;
