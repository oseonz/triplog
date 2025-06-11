import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function WhitePageLayout() {
    const location = useLocation();
    const pathSegments = location.pathname.split('/');
    const lastSegment = pathSegments[pathSegments.length - 1];

    const pageTitleMap = {
        mypage_course: '나의 여행 코스',
        mypage_bookmark: '찜 목록',
        mypage_activity: '댓글',
    };

    const title = pageTitleMap[lastSegment] || '페이지 없음';

    return (
        <div className="w-full h-[140px] bg-white flex justify-center items-center">
            <div className="container mt-12 mb-6">
                <Link to="../../mypage">
                    <p className="text-xl text-gray-300">마이페이지</p>
                </Link>

                <span className="text-4xl font-bold">{title}</span>
            </div>
        </div>
    );
}

export default WhitePageLayout;
