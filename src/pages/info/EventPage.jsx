import React, { use, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EventCard from "../../components/info/EventCard"; // 카드 컴포넌트 임포트
import { endOfMonth, format, set, startOfMonth } from "date-fns";
import axios from "axios";

import CompactMonthPicker from "../../components/common/CompactMonthPicker";

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
  const [keyword, setKeyword] = useState("");    // 입력 중 화면이 갱신되는 것을 방지하기 위해 입력용과 갱신용을 분리함
  const [inputKeyword, setInputKeyword] = useState("");

  const [areacode, setAreacode] = useState("");
  const [sigungucode, setSigungucode] = useState("");

  const [cat3, setCat3] = useState("");
  const [gps_x, setGps_x] = useState("");
  const [gps_y, setGps_y] = useState("");
  const [radius_km, setRadius_km] = useState(20);

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(8);
  const [totalElements, setTotlElements] = useState(0);
  const [totalPage, setTotalPage] = useState(0);

  const [selected, setSelected] = useState(new Date());
  const p_start_date = format(startOfMonth(selected), "yyyyMMdd");  // 선택한 달의 첫날
  const p_end_date = format(endOfMonth(selected), "yyyyMMdd"); // 선택한 달의 마지막 날


    async function fetchData() {
    const URL = `${API_URL}?p_start_date=${p_start_date}&p_end_date=${p_end_date}&keyword=${keyword}&areacode=${areacode}&sigungucode=${sigungucode}&cat3=${cat3}&gps_x=${gps_x}&gps_y=${gps_y}&radius_km=${radius_km}&size=${pageSize}&page=${page}`;


    console.log(URL);
    try {
      const res = await axios(URL);
      console.log(res.data);
      setEventLists(res.data.items.content)
      setTotlElements(res.data.items.totalElements);
      setTotalPage(res.data.items.totalPages);
      
    } catch (error) {
      console.error("데이터를 가져오는 중 오류 발생:", error);
    }      
  }

  useEffect(() => {

   fetchData();
  },[page]);

  useEffect(() => {
    setPage(0); // 날짜가 변경되면 페이지를 초기화
    fetchData(); // 날짜가 변경되면 데이터 다시 가져오기  
  },[selected]);

  function handlePageChange(newPage) {
    setPage(newPage);
  }
  useEffect(() => {
    setPage(0); // 검색어가 변경되면 페이지를 초기화
    fetchData(); // 검색어가 변경되면 데이터 다시 가져오기  
  },[keyword]);

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
      <div className="w-full flex flex-col items-center gap-4 mt-8 mb-8 bg-blue-300">
        <CompactMonthPicker value={selected} onChange={setSelected}/>
        <div className="flex flex-col items-center gap-2">
          <div className="flex gap-2">
        <label className="text-sm font-medium">검색어:</label>
        <input
          type="text"
          placeholder="키워드를 입력하세요"
          className="border px-2 py-1 rounded"
          value={inputKeyword}
          onChange={(e) => setInputKeyword(e.target.value)}
        /><button onClick={()=>setKeyword(inputKeyword)}>검색</button></div>
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
                  contentid={event.contentid}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center mt-4 gap-3">
        <button
          className="px-2 py-1 text-sm text-white bg-blue-400 rounded"
          onClick={() => {
            handlePageChange(page - 1);
          }}
          disabled={page <= 0}
        >
          Prev
        </button>
        {page + 1}/ {totalPage}
        <button
          className="px-2 py-1 text-sm text-white bg-blue-400 rounded"
          onClick={() => {
            handlePageChange(page + 1);
          }}
          disabled={page + 1 >= totalPage}
        >
          Next
        </button>
      </div>
    </>
  );
}

export default EventPage;
