import React, { useState, useEffect } from "react";
import WhitePageLayout from "../../layouts/WhitePageLayout";
import MainLayout from "../../layouts/MainLayout";
import { Link } from "react-router-dom";
import TripCard from "../../components/TripCard";

const TABS = ["댓글", "좋아요"];

function MyActivitys() {
  const [activeTab, setActiveTab] = useState("댓글");
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fakeDB = {
      댓글: [
        {
          id: 1,
          coment: "재밌을 것 같아요",
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
    };
    setCards(fakeDB[activeTab] || []);
  }, [activeTab]);

  return (
    <MainLayout>
      <WhitePageLayout />
      <div className="min-h-screen bg-[#F3F5F6] flex justify-center">
        <div className="container">
          <div className="pt-7">
            <div className="flex bg-white border-y-2 justify-around mb-7">
              {TABS.map((tab, i) => (
                <div
                  key={i}
                  className="cursor-pointer border-r-2 last:border-r-0"
                  onClick={() => setActiveTab(tab)}
                >
                  <p
                    className={`text-xl font-bold p-5 px-[276px] ${
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
