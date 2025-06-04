import React from 'react';
import BasicMenu from './BasicMenu';
import ScrollToTop from '../components/common/ScrollToTop';

function MainLayout({ children }) {
    return (
        <>
            <ScrollToTop />{' '}
            {/* 다른 페이지로 이동 햇을 때 스크롤 위로 가게 함 */}
            <div className="bg-white shadow-md z-50 relative text-black">
                <BasicMenu />
            </div>
            <div>{children}</div>
        </>
    );
}

export default MainLayout;
