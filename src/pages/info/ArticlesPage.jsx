import React from "react";

function ArticlesPage() {
  return (
    <>
      <div className="w-full h-[140px] bg-white flex justify-center items-center">
        <div className="container mt-12">
          <span className="text-4xl font-bold">여행기사</span>
          <p className="text-xl text-gray-300">
            이달의 여행 기사 정보를 확인하세요!
          </p>
        </div>
      </div>
      <div className="min-h-screen bg-[#F3F5F6] flex justify-center pt-[72px]">
        <div className="container">
          <div className="flex w-full overflow-hidden rounded-2xl shadow-md mb-8">
            <div className="w-[250px] h-[200px] bg-gray-300"></div>
            <div className="flex-1 h-[200px] bg-white p-4 flex flex-col justify-center ps-10">
              <p className="text-xl mb-2">
                철도 위에 쌓이는 여행의 추억! 온 가족이 함께 즐기는 기차 여행지
                추천
              </p>
              <p className="text-sm text-blue-500">전국</p>
              <p className="text-xs text-gray-500">#태그</p>
            </div>
          </div>
          <div className="flex w-full overflow-hidden rounded-2xl shadow-md mb-8">
            <div className="w-[250px] h-[200px] bg-gray-300"></div>
            <div className="flex-1 h-[200px] bg-white p-4 flex flex-col justify-center ps-10">
              <p className="text-xl mb-2">
                철도 위에 쌓이는 여행의 추억! 온 가족이 함께 즐기는 기차 여행지
                추천
              </p>
              <p className="text-sm text-blue-500">전국</p>
              <p className="text-xs text-gray-500">#태그</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ArticlesPage;
