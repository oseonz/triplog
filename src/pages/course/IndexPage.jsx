import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout';
import ScrollToTop from '../../components/common/ScrollToTop';

function IndexPage() {
    return (
        <MainLayout>
            <div>
                <span>
                    {/* <Link to="list">여행 만들기</Link>
          <Link to="builder">코스 만들기</Link> */}
                </span>
                <ScrollToTop />
                {/* 스크롤 안 내려가게 함 */}
                <Outlet />
            </div>
        </MainLayout>
    );
}

export default IndexPage;
