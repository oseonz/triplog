import React, { useState, useEffect } from "react";
import MainLayout from "../../layouts/MainLayout";
import { Link } from "react-router-dom";
import WhitePageLayout from "../../layouts/WhitePageLayout";
import TripCard from "../../components/TripCard";
// import TripCard from "../components/TripCard"; // 실제 카드 컴포넌트 있으면 써라

const TABS = ["여행지", "음식점", "여행 코스", "공연/행사"];

function MyBookmarks() {
  const [activeTab, setActiveTab] = useState("여행지");
  const [cards, setItems] = useState([]);

  useEffect(() => {
    // 여기서 DB 요청 보내는 시뮬레이션
    const fetchData = async () => {
      // 나중엔 axios 같은 걸로 카테고리에 따라 요청하면 됨
      const fakeDB = {
        여행지: [
          { id: 1, title: "제주도", location: "제주", image: "jeju.jpg" },
        ],
        음식점: [
          { id: 2, title: "곱창집", location: "서울", image: "gop.jpg" },
        ],
        "여행 코스": [
          { id: 3, title: "부산 투어", location: "부산", image: "busan.jpg" },
        ],
        "공연/행사": [
          {
            id: 4,
            title: "불꽃놀이",
            location: "한강",
            image: "fireworks.jpg",
          },
        ],
      };

      setItems(fakeDB[activeTab] || []);
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
              {TABS.map((tab, i) => (
                <div
                  key={i}
                  className={`cursor-pointer border-r-2 last:border-r-0`}
                  onClick={() => setActiveTab(tab)}
                >
                  <p
                    className={`text-xl font-bold p-5 px-[100px] ${
                      activeTab === tab ? "text-blue-500" : "text-black"
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
