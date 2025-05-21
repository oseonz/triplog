import React from "react";
import DetailLayout from "../../layouts/DetailLayout";
import { Link } from "react-router-dom";
import TripCard from "../../components/common/TripCard.jsx";
import BlueBtn from "../../components/common/BlueBtn.jsx";

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

function DetailPage() {
  return (
    <div className="min-h-screen bg-white text-black">
      <DetailLayout>
        <div className="place-items-center gap-5">
          <p className="text-4xl font-bold pb-5">여행지 타이틀</p>
          <p className="pb-5 text-gray-500">서울특별시 종로구</p>
        </div>
        <div className="pt-12 place-items-end pb-5">
          <div className="flex gap-2">
            <div className="flex items-center gap-1">
              <img src="../public/images/i_heart.png" alt="" />
              <p>좋아요</p>
            </div>
            <div className="flex items-center gap-1">
              <img src="../public/images/i_bookmarks.png" alt="" />
              <p>북마크</p>
            </div>
            <div className="flex items-center gap-1">
              <img src="../public/images/i_share.png" alt="" />
              <p>공유하기</p>
            </div>
          </div>
        </div>
        {/* <div className="flex bg-white border-y-2 justify-center mb-7">
          <div className="border-r-2 border-grary-300">
            <p className="text-xl font-bold p-5 px-[100px]">사진 보기</p>
          </div>
          <div className="border-r-2 border-grary-300">
            <p className="text-xl font-bold p-5 px-[100px]">상세 정보</p>
          </div>
          <div className="border-r-2 border-grary-300">
            <p className="text-xl font-bold p-5 px-[100px]">추천 여행지</p>
          </div>
          <div className="">
            <p className="text-xl font-bold p-5 px-[100px]">로그톡톡</p>
          </div>
        </div> */}
        <div className="h-[375px] bg-blue-500 mb-7">사진</div>
        <div className="mb-12">
          <div className="mb-2">
            <p className="text-2xl font-bold">상세 정보</p>
          </div>
          <div className="border border-black"></div>
          <div className="p-5">
            <p>
              인천대공원은 인천 남동구 장수동에 위치한 공원이다. 자연을 만끽할
              수 있는 즐거움이 있고 여유롭게 힐링할 수 있어 연간 400만 명의
              시민들이 찾는 수도권의 대표적인 휴양공원이다. 주요 시설로 수목원,
              습지원, 숲학교, 캠핑장, 휴게음식점, 공연시설 등을 갖추고 있다.
              체험은 산림치유프로그램, 목재문화체험, 어린이동물원 등을 운영한다.
              축구장, 풋살장은 미리 예약하면 이용할 수 있다. 다양한 체험과
              쾌적한 휴식처를 제공하는 생명의 숲에서 행복한 시간을 보내보자.
            </p>
          </div>
        </div>
        <div>
          <div className="h-[300px] bg-blue-500">지도</div>
          <div className="bg-white p-10 flex mb-12">
            <ul className="ps-20">
              <li className="items-start flex gap-2 float-left w-[50%] pt-1">
                <span className="text-[18px] w-[130px]">• 문의 및 안내</span>
                <span className="">어쩌고 저쩌고</span>
              </li>
              <li className="items-start flex gap-2 float-left w-[50%] pt-1">
                <span className="text-[18px] w-[130px]">• 이용 시간</span>
                <span className="">어쩌고 저쩌고</span>
              </li>
              <li className="items-start flex gap-2 float-left w-[50%] pt-1">
                <span className="text-[18px] w-[130px]">• 주소</span>
                <span className="">어쩌고 저쩌고</span>
              </li>
              <li className="items-start flex gap-2 float-left w-[50%] pt-1">
                <span className="text-[18px] w-[130px]">• 주차</span>
                <span className="">어쩌고 저쩌고</span>
              </li>
              <li className="items-start flex gap-2 float-left w-[50%] pt-1">
                <span className="text-[18px] w-[130px]">• 휴일</span>
                <span className="">어쩌고 저쩌고</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mb-12">
          <div className="mb-2">
            <p className="text-2xl font-bold">추천 여행지</p>
          </div>
          <div className="border border-black"></div>
          <div className="pt-5">
            <Link to="../detail">
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
            </Link>
          </div>
        </div>
        <div className="flex justify-center items-center gap-5 mb-12">
          <BlueBtn />
        </div>
        <div className="mb-12">
          <div className="mb-2">
            <p className="text-2xl font-bold">로그 톡톡</p>
          </div>
          <textarea
            name="comment"
            placeholder="소중한 댓글을 남겨주세요."
            className="w-[1200px] h-[100px] border border-gray-300 p-4 placeholder:text-start resize-none mb-4"
          />
          <div className="flex justify-end">
            <button className="bg-blue-500 text-white py-2 px-6 border border-blue-500 hover:bg-blue-600">
              등록
            </button>
          </div>
        </div>
      </DetailLayout>
    </div>
  );
}

export default DetailPage;
