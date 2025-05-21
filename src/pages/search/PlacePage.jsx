import React, { useRef, useEffect, useState } from "react";
import { getList } from "../../api/tourAPI.jsx";
import TripRegion from "../../components/search/TripRegion.jsx";
import TripCard from "../../components/common/TripCard.jsx";
import { Link } from "react-router-dom";
import Regions from "../../components/search/Regions.jsx";
import axios from "axios";

const params = {
  user_id: "",
  areacode: 1,
  sigungucode: 20,
  page: 0,
  size: 8,
};

function PlacePage() {
  const scrollRef = useRef(null);
  const [tourListData, setTourListData] = useState([]);

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

  useEffect(() => {
    getList(params).then((data) => {
      console.log("받은 응답:", data);
      if (data && Array.isArray(data.items?.content)) {
        setTourListData(data.items.content);
      } else {
        console.error("❌ content 배열이 없음", data);
        setTourListData([]);
      }
    });
  }, []);

  const extractSiGu = (addr) => {
    if (!addr) return "주소없음";
    const regex = /^([가-힣]+(특별시|광역시|도)?\s[가-힣]+구)/;
    const match = addr.match(regex);
    return match ? match[1] : "시/구 없음";
  };

  return (
    <div className="min-h-screen bg-[#F3F5F6] text-black">
      <Regions>
        <div className="container mx-auto py-10">
          <div className="relative">
            <button
              onClick={scrollLeft}
              className="absolute left-[-50px] top-1/2 -translate-y-1/2 z-10 rounded-full hover:bg-opacity-80"
            >
              <img src="../public/images/arrowLeft.png" alt="" />
            </button>

            <div
              ref={scrollRef}
              className="flex gap-4 overflow-x-auto scrollbar-hide px-10"
            >
              {[
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
              ].map((region, index) => (
                <TripRegion key={index} regionName={region} />
              ))}
            </div>

            <button
              onClick={scrollRight}
              className="absolute right-[-50px] top-1/2 -translate-y-1/2 z-10 rounded-full hover:bg-opacity-80"
            >
              <img src="../public/images/arrowRight.png" alt="" />
            </button>
          </div>
        </div>
      </Regions>

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
        {/* <div className="pb-[30px]">
          <span className="text-[22px] text-black font-bold">
            👍 <span className="text-blue-500">최근 인기 있는</span> 여행지
          </span>
        </div> */}
        <div className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl">
            {tourListData.map((item, i) => (
              <Link to={`../detail/${item.contentid}`} key={i}>
                <TripCard
                  title={item.title}
                  firstimage={
                    item.firstimage || "https://via.placeholder.com/300"
                  }
                  addr={extractSiGu(item.addr)}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlacePage;
