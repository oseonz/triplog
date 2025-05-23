import React from "react";
import { Link } from "react-router-dom";
import EventCard from "../../components/info/EventCard"; // 카드 컴포넌트 임포트

function EventPage() {
  const dummyEvents = [
    {
      image: "/images/event1.jpg",
      title: "미친 락 페스티벌 2025",
      location: "서울 잠실종합운동장",
    },
    {
      image: "/images/event2.jpg",
      title: "재즈 나잇 인 홍대",
      location: "서울 마포구",
    },
    {
      image: "/images/event3.jpg",
      title: "댄스 배틀: 파이널 스테이지",
      location: "부산 벡스코",
    },
    {
      image: "/images/event3.jpg",
      title: "댄스 배틀: 파이널 스테이지",
      location: "부산 벡스코",
    },
  ];

  return (
    <>
      <div className="w-full h-[140px] bg-white flex justify-center items-center">
        <div className="container mt-12">
          <span className="text-4xl font-bold">공연/행사</span>
          <p className="text-xl text-gray-300">
            이달의 공연/행사 정보를 확인하세요!
          </p>
        </div>
      </div>
      <div className="min-h-screen bg-[#F3F5F6] flex justify-center pt-[72px]">
        <div className="container">
          <div className="flex justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl">
              {dummyEvents.map((event, index) => (
                <EventCard
                  key={index}
                  image={event.image}
                  title={event.title}
                  location={event.location}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EventPage;
