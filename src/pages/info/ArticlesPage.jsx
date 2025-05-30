import React, { useEffect, useState } from "react";
import NewsCard from "../../components/info/ArticlesCard";
import ArticlesCard from "../../components/info/ArticlesCard";
import axios from "axios";




function ArticlesPage() {


const [keyword, setKeyword] = useState("추천여행지"); 
const page = 1; // 네이버 API는 페이지가 1부터 시작하므로 1로 설정
const pageSize = 10; // 페이지당 기사 수

const API_URL = `http://localhost:8081/api/news?keyword=${keyword}&page=${page}&size=${pageSize}`;

const [articleList, setArticleList] = useState([]);

useEffect(()=>{
  async function fetchData() {
    try {
      const rest = await axios(API_URL);
      console.log(rest.data.items);
      setArticleList(rest.data.items);
    }
    catch (error) {
      console.error("데이터를 가져오는 중 오류 발생:", error);
    }
  }

  fetchData();
},[]);


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
          <div className="flex justify-center">
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 gap-6 w-full max-w-6xl">

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
    </>
  );
}

export default ArticlesPage;
