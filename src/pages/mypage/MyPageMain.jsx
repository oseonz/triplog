import React from "react";
import MainLayout from "../../layouts/MainLayout";
import WhitePageLayout from "../../layouts/WhitePageLayout";
import { Link } from "react-router-dom";
//마이페이지
function MyPageMain() {
  return (
    <MainLayout>
      <div className="w-full h-[140px] bg-white flex justify-center items-center">
        <div className="container mt-12">
          <span className="text-4xl font-bold">마이페이지</span>
        </div>
      </div>
      <div className="min-h-screen bg-[#F3F5F6] flex justify-center pt-14">
        <div className="container flex  items-start pb-5 justify-between">
          <div className="bg-blue-500 rounded-[10px] flex flex-col p-[100px]">
            <div className="rounded-full w-[200px] h-[200px] bg-gray-300"></div>
            <div className="text-center mt-4">
              <p className="text-[30px] text-white font-bold">이름 님</p>
              <span className="text-white hover:underline cursor-pointer">
                프로필 사진 설정
              </span>
            </div>
          </div>

          <div>
            <p className="text-2xl font-bold pb-5">나의 활동</p>
            <div className="bg-white flex py-[50px] px-[120px] gap-20 rounded-[10px] mb-5">
              <Link to="../mypage/mypage_course">
                <div className="flex flex-col items-center">
                  <div className="bg-gray-300 w-[100px] h-[100px] rounded-[30px]"></div>
                  <p className="text-[18px] font-bold">나의 여행 코스</p>
                </div>
              </Link>
              <Link to="../mypage/mypage_bookmark">
                <div className="flex flex-col items-center">
                  <div className="bg-gray-300 w-[100px] h-[100px] rounded-[30px]"></div>
                  <p className="text-[18px] font-bold">찜 목록</p>
                </div>
              </Link>

              <Link to="../mypage/mypage_activity">
                <div className="flex flex-col items-center">
                  <div className="bg-gray-300 w-[100px] h-[100px] rounded-[30px]"></div>
                  <p className="text-[18px] font-bold">댓글/좋아요</p>
                </div>
              </Link>
            </div>
            <p className="text-2xl font-bold pb-5">캘린더</p>
            <div className="bg-white">캘린더</div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default MyPageMain;
