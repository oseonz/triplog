import React from "react";
import { Link } from "react-router-dom";

function EventPage() {
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
      <div className="min-h-screen bg-[#F3F5F6] flex justify-center pt-[72px]"></div>
    </>
  );
}

export default EventPage;
