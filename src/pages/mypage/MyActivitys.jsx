import React, { useState, useEffect } from "react";
import WhitePageLayout from "../../layouts/WhitePageLayout";
import MainLayout from "../../layouts/MainLayout";
import { Link } from "react-router-dom";
import TripCard from "../../components/TripCard";

const TABS = ["댓글", "좋아요"];

function MyActivitys() {
  const [activeTab, setActiveTab] = useState("여행지");
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fakeDB = {
      여행지: [
        {
          id: 1,
          title: "제주도",
          location: "제주",
          image: "jeju.jpg",
          tag: "자연",
        },
      ],
      음식점: [
        {
          id: 2,
          title: "곱창집",
          location: "서울",
          image: "gop.jpg",
          tag: "한식",
        },
      ],
      "여행 코스": [
        {
          id: 3,
          title: "부산 투어",
          location: "부산",
          image: "busan.jpg",
          tag: "도시",
        },
      ],
      "공연/행사": [
        {
          id: 4,
          title: "불꽃놀이",
          location: "한강",
          image: "fireworks.jpg",
          tag: "이벤트",
        },
      ],
    };
    setCards(fakeDB[activeTab] || []);
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

          <div className="pt-14">
            <div className="flex bg-white border-y-2 justify-around mb-7">
              {TABS.map((tab, i) => (
                <div
                  key={i}
                  className="cursor-pointer border-r-2 last:border-r-0"
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cards.length === 0 ? (
              <p className="col-span-4 text-center text-gray-500">
                찜한 {activeTab}가 없습니다.
              </p>
            ) : (
              cards.map((card, i) => (
                <Link to={`/detail/${card.id}`} key={i}>
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

export default MyActivitys;
