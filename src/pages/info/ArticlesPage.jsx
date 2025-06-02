import React, { useEffect, useState } from 'react';
import NewsCard from '../../components/info/ArticlesCard';
import ArticlesCard from '../../components/info/ArticlesCard';
import axios from 'axios';

function ArticlesPage() {
    const [page, setPage] = useState(1); // 네이버 API는 페이지가 1부터 시작하므로 1로 설정
    const [keyword, setKeyword] = useState('국내여행가볼곳');
    const pageSize = 8; // 페이지당 기사 수
    const [totalElements, setTotalElements] = useState(0);
    const [totalPage, setTotalPage] = useState(0);

    const [articleList, setArticleList] = useState([]);

    function handlePageChange(newPage) {
        setPage(newPage);
    }

    async function fetchData() {
        try {
            const API_URL = `http://localhost:8081/api/news?keyword=${keyword}&page=${page}&size=${pageSize}`;

            const res = await axios(API_URL);
            console.log(res);

            setTotalElements(res.data.total); // 전체 아이템 수

            console.log('전체 아이템 수:', totalElements);
            setArticleList(res.data.items);

            const totalPages = Math.ceil(res.data.total / pageSize); // // 전체 페이지 수 계산
            setTotalPage(totalPages);

            console.log('전체 페이지 수:', totalPage);
        } catch (error) {
            console.error('데이터를 가져오는 중 오류 발생:', error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        fetchData();
    }, [page]);

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
                            {articleList.map((article, index) => {
                                return (
                                    <ArticlesCard
                                        key={index}
                                        title={article.title}
                                        description={article.description}
                                        link={article.link}
                                        pubDate={article.pubDate}
                                    />
                                );
                            })}
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
                    disabled={page <= 1}
                >
                    Prev
                </button>
                {page}/ {totalPage}
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

export default ArticlesPage;
