import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EventCard from "../../components/info/EventCard"; // 카드 컴포넌트 임포트
import { endOfMonth, format, set, startOfMonth } from "date-fns";
import axios from "axios";
// npm install date-fns 필요함

function EventPage() {


  const imsidata = [
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

  const [eventLists, setEventLists] = useState(imsidata);

  const API_URL = "http://localhost:8081/events/list"
  const [keyword, setKeyword] = useState("");

  const [areacode, setAreacode] = useState("");
  const [sigungucode, setSigungucode] = useState("");

  const [cat3, setCat3] = useState("");
  const [gps_x, setGps_x] = useState("");
  const [gps_y, setGps_y] = useState("");
  const [radius_km, setRadius_km] = useState(20);

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(8);


  useEffect(() => {
    const now = new Date();
    const p_start_date = format(startOfMonth(now), "yyyyMMdd");
    const p_end_date = format(endOfMonth(now), "yyyyMMdd");
  

    const URL = `${API_URL}?p_start_date=${p_start_date}&p_end_date=${p_end_date}&keyword=${keyword}&areacode=${areacode}&sigungucode=${sigungucode}&cat3=${cat3}&gps_x=${gps_x}&gps_y=${gps_y}&radius_km=${radius_km}&size=${pageSize}&page=${page}`;


    async function fetchData() {
      console.log(URL);
      try {
        const res = await axios(URL);
        console.log(res.data.items.content);
        setEventLists(res.data.items.content)
        
      } catch (error) {
        console.error("데이터를 가져오는 중 오류 발생:", error);
      }      
    }

    fetchData();
  },[]);

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
              {eventLists.map((event, index) => (
                <EventCard
                  key={index}
                  image={event.firstimage}
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
