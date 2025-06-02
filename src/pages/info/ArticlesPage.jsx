import React, { useEffect, useState } from "react";
import NewsCard from "../../components/info/ArticlesCard";
import ArticlesCard from "../../components/info/ArticlesCard";
import axios from "axios";
import { set } from "date-fns";




function ArticlesPage() {

const [keyword, setKeyword] = useState("국내여행가볼곳"); 
const pageSize = 8; // 페이지당 기사 수
const [totalElements, setTotalElements] = useState(0);



const [articleList, setArticleList] = useState([]);

const [currentPage, setCurrentPage] = useState(1); // 네이버 API는 페이지가 1부터 시작하므로 1로 설정
const [totalPages, setTotalPages] = useState(0);

const handlePageChange = (page) => {
  if (page >= 0 && page < totalPages) {
    setCurrentPage(page);
    // setPage(page);
    // setParams((prev) => ({ ...prev, page }));
  }
}; //페이지네이션

// function handlePageChange(newPage) {
//   setCurrentPage(newPage);
// }

async function fetchData() {
  try {

    const API_URL = `http://localhost:8081/api/news?keyword=${keyword}&page=${currentPage}&size=${pageSize}`;

    const res = await axios(API_URL);
    console.log(res);

    setTotalElements(res.data.total); // 전체 아이템 수

    console.log("전체 아이템 수:", totalElements);
    setArticleList(res.data.items);


    const totalPages = Math.ceil(res.data.total / pageSize); // // 전체 페이지 수 계산
    setTotalPages(totalPages);

    console.log("전체 페이지 수:", totalPages);
  }
  catch (error) {
    console.error("데이터를 가져오는 중 오류 발생:", error);
  }
}

useEffect(()=>{
  fetchData();
},[]);


useEffect(() => {
  fetchData();
},[currentPage]);

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


      <div className="min-h-screen bg-[#F3F5F6] flex justify-center pt-[52px]">
        <div className="container">
          <div className="flex justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-6 w-full max-w-6xl">

              {articleList.map((article, index)=>{
                  return (
                  <ArticlesCard
                      key={index}
                      title={article.title}
                      description={article.description}
                      link={article.link}
                      pubDate={article.pubDate}                  
                  />)
      
              })}

            </div>
          </div>
        </div>
      </div>

<div className="flex justify-center mt-10">
  <div className="flex gap-2 items-center">
    {/* 10페이지 단위 이전 */}
    <button
      onClick={() => handlePageChange(Math.max(0, Math.floor(currentPage / 10 - 1) * 10))}
      disabled={currentPage < 10}
      className="px-3 py-2 bg-white border rounded disabled:opacity-50"
    >
      «
    </button>

      {/* 현재 페이지 블록 표시 */}
      {Array.from({ length: Math.min(10, totalPages - Math.floor(currentPage / 10) * 10) }, (_, i) => {
        const pageIndex = Math.floor(currentPage / 10) * 10 + i;
        return (
          <button
            key={pageIndex}
            onClick={() => handlePageChange(pageIndex)}
            className={`px-4 py-2 rounded-full border ${
              pageIndex === currentPage
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-white text-black border-gray-300"
            }`}
          >
            {pageIndex + 1}
          </button>
        );
      })}

      {/* 10페이지 단위 다음 */}
      <button
        onClick={() =>
          handlePageChange(Math.min(totalPages - 1, Math.floor(currentPage / 10 + 1) * 10))
        }
        disabled={Math.floor(currentPage / 10 + 1) * 10 >= totalPages}
        className="px-3 py-2 bg-white border rounded disabled:opacity-50"
      >
        »
      </button>
    </div>
  </div>


      {/* <div className="flex justify-center items-center mt-4 gap-3">
        <button
          className="px-2 py-1 text-sm text-white bg-blue-400 rounded"
          onClick={() => {
            handlePageChange(currentPage - 1);
          }}
          disabled={currentPage <= 1}
        >
          Prev
        </button>
        {currentPage}/ {totalPage}
        <button
          className="px-2 py-1 text-sm text-white bg-blue-400 rounded"
          onClick={() => {
            handlePageChange(currentPage + 1);
          }}
          disabled={currentPage + 1 >= totalPage}
        >
          Next
        </button>
      </div> */}
    </>
  );
}

export default ArticlesPage;
