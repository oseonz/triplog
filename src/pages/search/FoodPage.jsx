//음식점 페이지
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

// 카드 더미 데이터
const cards = [
  {
    title: "Jinmi Sikdang",
    image: "https://source.unsplash.com/featured/?koreanfood",
    location: "Seoul",
    tag: "Korean BBQ",
  },
  {
    title: "Gukbap Heaven",
    image: "https://source.unsplash.com/featured/?koreanrestaurant",
    location: "Busan",
    tag: "Pork Soup",
  },
  {
    title: "Jeonju Bibimbap",
    image: "https://source.unsplash.com/featured/?bibimbap",
    location: "Jeonju",
    tag: "Bibimbap",
  },
  {
    title: "Hanok Eats",
    image: "https://source.unsplash.com/featured/?koreanfood2",
    location: "Gyeongju",
    tag: "Traditional",
  },
];

function FoodPage() {
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
    <div className="min-h-screen text-white bg-[#F3F5F6]">
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
            방방곡곡 맛집 어디까지 가봤나요?<br></br>
            인기 <span className="font-bold">음식점</span> 알려줄게요!
          </span>
          <span className="text-blue-500 hover:underline cursor-pointer">
            <Link to="">여행지 보러가기</Link>
          </span>
        </div>
        <div className="pb-[30px]">
          <span className="text-[22px] text-black font-bold">
            👍 <span className="text-blue-500">최근 인기 있는</span> 음식점
          </span>
        </div>
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cards.map((card, i) => (
              <TripCard
                key={i}
                title={card.title}
                image={card.image}
                location={card.location}
                tag={card.tag}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FoodPage;
