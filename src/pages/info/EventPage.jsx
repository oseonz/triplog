import React, { use, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import EventCard from '../../components/info/EventCard'; // 카드 컴포넌트 임포트
import { endOfMonth, format, set, startOfMonth } from 'date-fns';
import axios from 'axios';

import CompactMonthPicker from '../../components/common/CompactMonthPicker';
import { userState } from '../mypage/atom/userState';
import { useRecoilValue } from 'recoil';

// npm install date-fns 필요함

function EventPage() {
    const { id } = useRecoilValue(userState); // 유저id
    // const id = 2
    const imsidata = [
        {
            image: '/images/event1.jpg',
            title: '미친 락 페스티벌 2025',
            location: '서울 잠실종합운동장',
        },
        {
            image: '/images/event2.jpg',
            title: '재즈 나잇 인 홍대',
            location: '서울 마포구',
        },
    ];

    const [eventLists, setEventLists] = useState(imsidata);

    const API_URL = 'http://localhost:8081/events/list';
    const [keyword, setKeyword] = useState(''); // 입력 중 화면이 갱신되는 것을 방지하기 위해 입력용과 갱신용을 분리함
    const [inputKeyword, setInputKeyword] = useState('');

    const [areacode, setAreacode] = useState('');
    const [sigungucode, setSigungucode] = useState('');

    const [cat3, setCat3] = useState('');
    const [gps_x, setGps_x] = useState('');
    const [gps_y, setGps_y] = useState('');
    const [radius_km, setRadius_km] = useState(20);

    // const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(8);
    const [totalElements, setTotlElements] = useState(0);

    const [selected, setSelected] = useState(new Date());
    const p_start_date = format(startOfMonth(selected), 'yyyyMMdd'); // 선택한 달의 첫날
    const p_end_date = format(endOfMonth(selected), 'yyyyMMdd'); // 선택한 달의 마지막 날

    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);

    const handlePageChange = (page) => {
        if (page >= 0 && page < totalPages) {
            setCurrentPage(page);
            // setPage(page);
            // setParams((prev) => ({ ...prev, page }));
        }
    }; //페이지네이션

    async function fetchData() {
        const URL = `${API_URL}?p_start_date=${p_start_date}&p_end_date=${p_end_date}&keyword=${keyword}&areacode=${areacode}&sigungucode=${sigungucode}&cat3=${cat3}&gps_x=${gps_x}&gps_y=${gps_y}&radius_km=${radius_km}&size=${pageSize}&page=${currentPage}`;

        console.log(URL);
        try {
            const res = await axios(URL);
            console.log(res.data);
            setEventLists(res.data.items.content);
            setTotlElements(res.data.items.totalElements);
            setTotalPages(res.data.items.totalPages);
        } catch (error) {
            console.error('데이터를 가져오는 중 오류 발생:', error);
        }
    }

    useEffect(() => {
        fetchData();
    }, [currentPage]);

    useEffect(() => {
        setCurrentPage(0); // 날짜가 변경되면 페이지를 초기화
        fetchData(); // 날짜가 변경되면 데이터 다시 가져오기
    }, [selected]);

    useEffect(() => {
        setCurrentPage(0); // 검색어가 변경되면 페이지를 초기화
        fetchData(); // 검색어가 변경되면 데이터 다시 가져오기
    }, [keyword]);

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
            <div className="w-full flex flex-col items-center gap-4 mt-8 mb-8 bg-blue-300">
                <CompactMonthPicker value={selected} onChange={setSelected} />
                <div className="flex flex-col items-center gap-2">
                    <div className="flex gap-2">
                        <label className="text-sm font-medium">검색어:</label>
                        <input
                            type="text"
                            placeholder="키워드를 입력하세요"
                            className="border px-2 py-1 rounded"
                            value={inputKeyword}
                            onChange={(e) => setInputKeyword(e.target.value)}
                        />
                        <button onClick={() => setKeyword(inputKeyword)}>
                            검색
                        </button>
                    </div>
                </div>
            </div>

            <div className="min-h-screen flex justify-center pt-[72px]">
                <div className="container">
                    <div className="flex justify-center">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl">
                            {eventLists.map((event, index) => {
                                if (!event.contentId || !id) {
                                    console.warn(
                                        '렌더링 건너뜀: contentId 또는 user_id 누락',
                                        event,
                                    );
                                    return null;
                                }

                                return (
                                    <EventCard
                                        key={index}
                                        user_id={id}
                                        contentId={event.contentId}
                                        contentTypeId={event.contentTypeId}
                                        title={event.title}
                                        addr1={event.addr1}
                                        addr2={event.addr2}
                                        areaCode={event.areaCode}
                                        sigunguCode={event.sigunguCode}
                                        firstimage={event.firstimage}
                                        mapx={event.mapx}
                                        mapy={event.mapy}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-center mt-10  pb-7">
                <div className="flex gap-2 items-center">
                    {/* 10페이지 단위 이전 */}
                    <button
                        onClick={() =>
                            handlePageChange(
                                Math.max(
                                    0,
                                    Math.floor(currentPage / 10 - 1) * 10,
                                ),
                            )
                        }
                        disabled={currentPage < 10}
                        className="px-3 py-2 bg-white border rounded disabled:opacity-50"
                    >
                        «
                    </button>

                    {/* 현재 페이지 블록 표시 */}
                    {Array.from(
                        {
                            length: Math.min(
                                10,
                                totalPages - Math.floor(currentPage / 10) * 10,
                            ),
                        },
                        (_, i) => {
                            const pageIndex =
                                Math.floor(currentPage / 10) * 10 + i;
                            return (
                                <button
                                    key={pageIndex}
                                    onClick={() => handlePageChange(pageIndex)}
                                    className={`px-4 py-2 rounded-full border ${
                                        pageIndex === currentPage
                                            ? 'bg-blue-500 text-white border-blue-500'
                                            : 'bg-white text-black border-gray-300'
                                    }`}
                                >
                                    {pageIndex + 1}
                                </button>
                            );
                        },
                    )}

                    {/* 10페이지 단위 다음 */}
                    <button
                        onClick={() =>
                            handlePageChange(
                                Math.min(
                                    totalPages - 1,
                                    Math.floor(currentPage / 10 + 1) * 10,
                                ),
                            )
                        }
                        disabled={
                            Math.floor(currentPage / 10 + 1) * 10 >= totalPages
                        }
                        className="px-3 py-2 bg-white border rounded disabled:opacity-50"
                    >
                        »
                    </button>
                </div>
            </div>
        </>
    );
}

export default EventPage;
