import React, { useState, useEffect } from 'react';
import MainLayout from '../../layouts/MainLayout';
import { Link } from 'react-router-dom';
import WhitePageLayout from '../../layouts/WhitePageLayout';
import TripCard from '../../components/common/TripCard.jsx';
// import TripCard from "../components/TripCard"; // 실제 카드 컴포넌트 있으면 써라

export const getUserBookmarks = async (user_id) => {
    const res = await axios.get(
        `http://localhost:8081/favorites/list/${user_id}`,
    );
    return res.data; // [{ contenttypeid: '12', title: ..., ... }, ...]
};

const TABS = {
    여행지: '12',
    음식점: '39',
    '여행 코스': '25',
    '공연/행사': '15',
};

function MyBookmarks() {
    const [activeTab, setActiveTab] = useState('여행지');
    const [cards, setItems] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const allBookmarks = await getUserBookmarks(6); // 유저 ID 고정값 말고 로그인 정보 쓰도록 나중에 바꿔라

                const contenttypeid = TABS[activeTab];

                const filtered = allBookmarks.filter(
                    (item) => item.contenttypeid === contenttypeid,
                );

                // TripCard에 맞춰 필드 정리
                const formatted = filtered.map((item) => ({
                    id: item.contentid,
                    title: item.title,
                    location: item.addr,
                    image: item.firstimage,
                    tag: '', // 태그 없으면 빈 값
                }));

                setItems(formatted);
            } catch (err) {
                console.error('북마크 불러오기 실패:', err);
            }
        };

        fetchData();
    }, [activeTab]);

    return (
        <MainLayout>
            <WhitePageLayout />
            <div className="min-h-screen bg-[#F3F5F6] flex justify-center pt-4">
                <div className="container">
                    <div className="flex float-right">
                        <Link to="../../search/place">
                            <button
                                type="button"
                                className="text-white bg-blue-500 border border-blue-500 px-6 py-2 hover:bg-blue-600"
                            >
                                찜하러 가기
                            </button>
                        </Link>
                    </div>

                    {/* 탭 영역 */}
                    <div className="pt-14">
                        <div className="flex bg-white border-y-2 justify-center mb-7">
                            {Object.keys(TABS).map((tab, i) => (
                                <div
                                    key={i}
                                    className={`cursor-pointer border-r-2 last:border-r-0`}
                                    onClick={() => setActiveTab(tab)}
                                >
                                    <p
                                        className={`text-xl font-bold p-5 px-[100px] ${
                                            activeTab === tab
                                                ? 'text-blue-500'
                                                : 'text-black'
                                        }`}
                                    >
                                        {tab}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 찜 목록 표시 */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {cards.length === 0 ? (
                            <p className="col-span-4 text-center text-gray-500">
                                찜한 {activeTab}가 없습니다.
                            </p>
                        ) : (
                            cards.map((card, i) => (
                                <Link to="" key={i}>
                                    <TripCard
                                        title={card.title}
                                        image={card.image}
                                        location={card.location}
                                        tag={card.tag}
                                    />
                                </Link>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}

export default MyBookmarks;
