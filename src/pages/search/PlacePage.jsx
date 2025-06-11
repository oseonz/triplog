import React, { useRef, useEffect, useState } from 'react';
import { getList } from '../../api/search/placeLikes.jsx';
import TripRegion from '../../components/search/TripRegion.jsx';
import TripCard from '../../components/common/TripCard.jsx';
import { Link } from 'react-router-dom';
import Regions from '../../components/search/Regions.jsx';
import { userState } from '../mypage/atom/userState';
import { useRecoilValue } from 'recoil';
import { searchGovContent } from '../../api/search/newSearchApi.js';

//java -jar tourAPI-0521.war

function PlacePage() {


    const [keyword, setKeyword] = useState("");

    const { id } = useRecoilValue(userState); // 유저id
    // const id = 2

    const scrollRef = useRef(null);
    const [tourListData, setTourListData] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
        setTotalPages(Math.max(1, Math.ceil(totalCount / 12)));
    }, [totalCount]);

    useEffect(() => {
        setParams((prev) => ({ ...prev, page: currentPage }));
    }, [currentPage]);

    const [params, setParams] = useState({
        contenttypeid: 12,
        page: 1,
        size: 12,
        areacode: '',
        sigungucode: '',
        keyword: '',
    });

    const [selectedRegion, setSelectedRegion] = useState('서울');

    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
        }
    };

    const handleSearchKeyword = (e) => {
        
        e.stopPropagation();
        e.preventDefault();

        if (!keyword || keyword.trim() === "") {
            alert("검색어를 입력해 주세요.");
            return;
        }

        setParams((prev) => ({ ...prev, keyword: keyword, areacode: '',sigungucode: '', page: 1}));

        setKeyword("")

    }


    useEffect(() => {
        searchGovContent(params).then((data) => {
            console.log('받은 응답:', data);

            if (data && Array.isArray(data.items?.item)) {
                setTourListData(data.items.item);
                setTotalCount(data.totalCount);
                console.log(data.items.content);
            } else {
                console.error('❌ item 배열이 없음', data);
                setTourListData([]);
            }
        });
    }, [params]);

    const regionCodeMap = {
        서울: 1,
        인천: 2,
        대전: 3,
        대구: 4,
        광주: 5,
        부산: 6,
        울산: 7,
        세종: 8,
        경기: 31,
        강원: 32,
        충북: 33,
        충남: 34,
        전북: 35,
        전남: 36,
        경북: 37,
        경남: 38,
        제주: 39,
    };

    const handleRegionClick = (regionName) => {
        const code = regionCodeMap[regionName] || 1;
        setParams((prev) => ({ ...prev, areacode: code, page: 1, keyword: "" }));
        setCurrentPage(1);
        setSelectedRegion(regionName);
    };

    const extractSiGu = (addr1) => {
        if (!addr1) return '주소없음';
        const regex = /^([가-힣]+(특별시|광역시|도)?\s[가-힣]+(구|군|시|읍))/;
        const match = addr1.match(regex);
        return match ? match[1] : '시/구 없음';
    };

    const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
        console.log("페이지 변경)  ", page)
        setCurrentPage(page);
    }
    }; //페이지네이션

    const startPage = Math.floor((currentPage - 1) / 10) * 10 + 1;
    const endPage = Math.min(startPage + 9, totalPages);
    const pageButtons = Array.from({ length: endPage - startPage + 1 }, (_, i) => {
        const pageIndex = startPage + i;
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
                {pageIndex}
            </button>
        );
    });

    return (
        <div className="min-h-screen bg-white text-black pb-7">
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
                                '서울',
                                '인천',
                                '대전',
                                '대구',
                                '광주',
                                '부산',
                                '울산',
                                '세종',
                                '제주',
                                '강원',
                                '경기',
                                '충북',
                                '충남',
                                '전북',
                                '전남',
                                '경북',
                                '경남',
                            ].map((region, index) => (
                                <TripRegion
                                    key={index}
                                    regionName={region}
                                    selected={selectedRegion === region} // 선택 여부
                                    onClick={() => handleRegionClick(region)}
                                />
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
                        인기 <span className="font-bold">여행지</span>{' '}
                        알려줄게요!
                    </span>
                    <form onSubmit={handleSearchKeyword} className="flex items-center gap-2">
                        <input
                            type="text"
                            name="keyword"
                            placeholder="키워드로 전국 조회"
                            onChange={(e)=>{setKeyword(e.target.value)}}
                            value={keyword}
                            className="py-4 ps-4 pr-40 border border-gray-300"
                        />
                        <div>
                            <img src="../public/images/i_search.png" alt="" onClick={handleSearchKeyword} />
                        </div>
                    </form>
                </div>
                {/* <div className="pb-[30px]">
          <span className="text-[22px] text-black font-bold">
            👍 <span className="text-blue-500">최근 인기 있는</span> 여행지
          </span>
        </div> */}
                <div className="flex justify-center">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl">
                        {tourListData.map((item, index) => {
                            // if (!item.contentId || !id) {
                            if (!item.contentid || !id) {
                                console.warn(
                                    '렌더링 건너뜀: contentId 또는 user_id 누락',
                                    item,
                                );
                                return null;
                            }

                            return (
                                // <Link
                                //     to={`/search/detail/${item.contentid}`}
                                //     key={index}
                                // >
                                <TripCard
                                    user_id={id}
                                    contentId={item.contentid}
                                    contentTypeId={item.contenttypeid}
                                    title={item.title}
                                    addr1={item.addr1}
                                    addr2={item.addr2}
                                    areaCode={item.areacode}
                                    sigunguCode={item.sigungucode}
                                    firstimage={item.firstimage}
                                    mapX={item.mapx}
                                    mapY={item.mapy}
                                />
                                // </Link>
                            );
                            //../detail/${item.contentid}
                        })}
                    </div>
                </div>

            <div className="flex justify-center mt-10  pb-7">
                <div className="flex gap-2 items-center">

                    <div className="flex gap-2 items-center">
                        {/* 이전 버튼 */}
                        <button
                            onClick={() => handlePageChange(Math.max(1, startPage - 10))}
                            disabled={startPage === 1}
                            className="px-3 py-2 bg-white border rounded disabled:opacity-50"
                        >
                            «
                        </button>

                        {/* 페이지 번호 버튼 */}
                        {pageButtons}

                        {/* 다음 버튼 */}
                        <button
                            onClick={() => handlePageChange(Math.min(totalPages, startPage + 10))}
                            disabled={startPage + 10 > totalPages}
                            className="px-3 py-2 bg-white border rounded disabled:opacity-50"
                        >
                            »
                        </button>
                    </div>

                </div>
            </div>

            </div>
        </div>
    );
}

export default PlacePage;
