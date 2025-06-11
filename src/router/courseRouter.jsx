import { Navigate } from 'react-router-dom';
import CourseBuilder from '../pages/course/CourseBuilder';
import ListPage from '../pages/course/ListPage';
import SubmitPage from '../pages/course/SubmitPage';
import IndexPage from '../pages/course/indexPage';

const courseRouter = () => {
    return {
        path: '/course',
        element: <IndexPage />,
        children: [
            { path: '', element: <Navigate to="list" replace /> }, // 기본 리다이렉트
            { path: 'list', element: <ListPage /> },
            { path: 'builder', element: <CourseBuilder /> },
            { path: 'detail/:courseId', element: <SubmitPage /> },
        ],
    };
};

export default courseRouter;
``;
