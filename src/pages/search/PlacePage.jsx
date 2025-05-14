import React, { useRef } from "react";
import SearchLayout from "../../layouts/SearchLayout";
import TripRegion from "../../components/TripRegion";
import TripCard from "../../components/TripCard";
import { Link } from "react-router-dom";

const regions = [
  "서울",
  "인천",
  "대전",
  "대구",
  "광주",
  "부산",
  "울산",
  "세종",
  "제주",
  "강원",
  "경기",
  "충북",
  "충남",
  "전북",
  "전남",
  "경북",
  "경남",
];

function PlacePage() {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen text-white bg-[#F3F5F6] text-black">
      <SearchLayout>
        <div className="container mx-auto py-10">
          <div className="relative">
            {/* 왼쪽 화살표 */}
            <button
              onClick={scrollLeft}
              className="absolute left-[-50px] top-1/2 -translate-y-1/2 z-10 rounded-full hover:bg-opacity-80"
            >
              <img src="../public/images/arrowLeft.png" alt="" />
            </button>

            {/* 리스트 영역 */}
            <div
              ref={scrollRef}
              className="flex gap-4 overflow-x-auto scrollbar-hide px-10"
            >
              {regions.map((region, index) => (
                <TripRegion key={index} regionName={region} />
              ))}
            </div>

            {/* 오른쪽 화살표 */}
            <button
              onClick={scrollRight}
              className="absolute right-[-50px] top-1/2 -translate-y-1/2 z-10 rounded-full hover:bg-opacity-80"
            >
              <img src="../public/images/arrowRight.png" alt="" />
            </button>
          </div>
        </div>
      </SearchLayout>

      <div className="container items-center m-auto mt-12">
        <div className="flex justify-between items-center pb-[30px]">
          <span className="text-2xl text-black">
            방방곡곡 우리나라 어디까지 가봤나요?<br></br>
            인기 <span className="font-bold">여행지</span> 알려줄게요!
          </span>
          <div className="flex items-center gap-2">
            <input
              type="text"
              name="email"
              placeholder="검색"
              className="py-4 ps-4 pr-40 border border-gray-300"
            />
            <div>
              <img src="../public/images/i_search.png" alt="" />
            </div>
          </div>
        </div>
        <div className="pb-[30px]">
          <span className="text-[22px] text-black font-bold">
            👍 <span className="text-blue-500">최근 인기 있는</span> 여행지
          </span>
        </div>
        <div className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl">
            {/* {cards.map((card, i) => (
              <Link to="../detail" key={i}>
                <TripCard
                  title={card.title}
                  image={card.image}
                  location={card.location}
                  tag={card.tag}
                />
              </Link>
            ))} */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlacePage;
