import PlacePage from '../pages/search/PlacePage';
import FoodPage from '../pages/search/FoodPage';
import IndexPage from '../pages/search/IndexPage';
import { Navigate } from 'react-router-dom';
import DetailPage from '../pages/search/DetailPage';

const courseRouter = () => {
    return {
        path: '/search',
        element: <IndexPage />,
        children: [
            { path: '', element: <Navigate to="place" replace /> }, // 기본 리다이렉트
            { path: 'place', element: <PlacePage /> },
            { path: 'food', element: <FoodPage /> },
            { path: 'detail/:contentid', element: <DetailPage /> },
        ],
    };
};

export default courseRouter;
