import { useEffect, useRef, useState } from 'react';
import { getList } from '../../api/course/placeLikes.jsx';
import TripRegion from '../../components/search/TripRegion.jsx';
import TripCard from '../../components/common/TripCard.jsx';
import { Link } from 'react-router-dom';
import Regions from '../../components/search/Regions.jsx';
import { userState } from '../mypage/atom/userState.js';
import { useRecoilValue } from 'recoil';

function FoodPage() {
    const { id } = useRecoilValue(userState); // 유저 ID
    const scrollRef = useRef(null);

    const [tourListData, setTourListData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedRegion, setSelectedRegion] = useState('서울');

    const [params, setParams] = useState({
        user_id: '',
        areacode: 1,
        contenttypeid: 39,
        page: 0,
        size: 12,
    });

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

    const handleRegionClick = (regionName) => {
        const code = regionCodeMap[regionName] || 1;
        setParams((prev) => ({ ...prev, areacode: code, page: 0 }));
        setCurrentPage(0);
        setSelectedRegion(regionName);
    };

    const handlePageChange = (page) => {
        if (page >= 0 && page < totalPages) {
            setCurrentPage(page);
            setParams((prev) => ({ ...prev, page }));
        }
    };

    useEffect(() => {
        if (!id) return;
        setParams((prev) => ({ ...prev, user_id: id }));
    }, [id]);

    useEffect(() => {
        getList(params).then((data) => {
            console.log('받은 응답:', data);
            if (data && Array.isArray(data.items?.content)) {
                setTourListData(data.items.content);
                setTotalPages(data.items.totalPages || 1);
            } else {
                console.error('❌ content 배열이 없음', data);
                setTourListData([]);
            }
        });
    }, [params]);

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
                            {Object.keys(regionCodeMap).map((region, index) => (
                                <TripRegion
                                    key={index}
                                    regionName={region}
                                    selected={selectedRegion === region}
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
                        방방곡곡 맛집 어디까지 가봤나요?
                        <br />
                        인기 <span className="font-bold">음식점</span>{' '}
                        알려줄게요!
                    </span>
                    <div className="flex items-center gap-2">
                        <input
                            type="text"
                            placeholder="검색"
                            className="py-4 ps-4 pr-40 border border-gray-300"
                        />
                        <div>
                            <img src="../public/images/i_search.png" alt="" />
                        </div>
                    </div>
                </div>

                <div className="flex justify-center">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl">
                        {tourListData.map((item, index) => {
                            if (!item.contentid || !id) {
                                console.warn(
                                    '렌더링 건너뜀: contentId 또는 user_id 누락',
                                    item,
                                );
                                return null;
                            }

                            return (
                                <TripCard
                                    key={index}
                                    user_id={id}
                                    contentId={item.contentid}
                                    contentTypeId={item.contenttypeid}
                                    title={item.title}
                                    addr1={item.addr1}
                                    addr2={item.addr2}
                                    areaCode={item.areacode}
                                    sigunguCode={item.sigungucode}
                                    firstimage={
                                        item.firstimage ||
                                        'https://via.placeholder.com/300'
                                    }
                                    mapX={item.mapX}
                                    mapY={item.mapY}
                                />
                            );
                        })}
                    </div>
                </div>

                <div className="flex justify-center mt-10">
                    <div className="flex gap-2">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 0}
                            className="px-4 py-2 bg-white text-black border rounded disabled:opacity-50"
                        >
                            이전
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i}
                                onClick={() => handlePageChange(i)}
                                className={`px-4 py-2 rounded-full border border-blue-500 ${
                                    i === currentPage
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-white text-black'
                                }`}
                            >
                                {i + 1}
                            </button>
                        ))}
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages - 1}
                            className="px-4 py-2 bg-white text-black border rounded disabled:opacity-50"
                        >
                            다음
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FoodPage;
