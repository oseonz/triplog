import React, { useEffect, useRef, useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import HomeLayout from '../layouts/HomeLayout';
import TripCard from '../components/common/TripCard.jsx';
import Home from '../components/common/Home.jsx';
import { getList } from '../api/course/placeLikes.jsx';
import { Link } from 'react-router-dom';
import BlueBtn from '../components/common/BlueBtn.jsx';
import TravelNewsSlider from '../components/common/TravelNewsSlider.jsx';
import { id } from 'date-fns/locale';
import { useRecoilValue } from 'recoil';
import { userState } from './mypage/atom/userState.js';
import FooterLayout from '../layouts/FooterLayout.jsx';
//메인페이지
function MainPage() {
    const { id } = useRecoilValue(userState); // 유저id
    const scrollRef = useRef(null);
    const [tourListData, setTourListData] = useState([]);

    const [totalPages, setTotalPages] = useState(1);

    const [params, setParams] = useState({
        user_id: '',
        areacode: 1,
        page: 0,
        size: 50,
    });

    useEffect(() => {
        getList(params).then((data) => {
            console.log('받은 응답:', data);
            if (data && Array.isArray(data.items?.content)) {
                const sorted = data.items.content
                    .filter((item) => item.likes_count !== undefined)
                    .sort((a, b) => b.likes_count - a.likes_count)
                    .slice(0, 4);
                setTourListData(sorted);
                setTotalPages(data.items.totalPages || 1);
            } else {
                console.error('❌ content 배열이 없음', data);
                setTourListData([]);
            }
        });
    }, [params]);

    const extractSiGu = (addr1) => {
        if (!addr1) return '주소없음';
        const regex = /^([가-힣]+(특별시|광역시|도)?\s[가-힣]+(구|군|시|읍))/;
        const match = addr1.match(regex);
        return match ? match[1] : '시/구 없음';
    };

    return (
        <>
            <MainLayout>
                <>
                    <div className="min-h-screen text-white bg-white">
                        <Home />
                        <div className="container items-center m-auto mt-12">
                            <div className="flex justify-between items-center pb-[60px]">
                                <span className="text-2xl text-black font-bold">
                                    가장 인기 많은 여행 코스
                                </span>
                            </div>
                            <div className="flex justify-center items-center gap-5 mb-12">
                                <BlueBtn
                                    to="/course/list"
                                    label="여행코스 더보기"
                                />
                            </div>

                            <div className="flex justify-between items-center pb-[30px]">
                                <span className="text-2xl text-black font-bold">
                                    BEST TOP4 여행지
                                </span>
                            </div>
                            <div className="flex justify-center pb-[60px]">
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl text-black">
                                    {tourListData.slice(0, 4).map((item, i) => (
                                        <Link
                                            to={`/search/detail/${item.contentid}`}
                                            key={i}
                                        >
                                            <TripCard
                                                user_id={id}
                                                contentId={item.contentid}
                                                contentTypeId={
                                                    item.contenttypeid
                                                }
                                                title={item.title}
                                                addr1={item.addr1}
                                                addr2={item.addr2}
                                                areaCode={item.areacode}
                                                sigunguCode={item.sigungucode}
                                                firstimage={item.firstimage}
                                                mapX={item.mapx}
                                                mapY={item.mapy}
                                                clickable={false} // TripCard에서 내부 링크 끔
                                            />
                                        </Link>
                                    ))}
                                </div>
                            </div>
                            <div className="flex justify-center items-center gap-5 mb-12">
                                <BlueBtn
                                    to="/search/place"
                                    label="여행지 더보기"
                                />
                            </div>
                            <div className="flex justify-between items-center pb-[30px]">
                                <span className="text-2xl text-black font-bold">
                                    이달의 여행 기사
                                </span>
                            </div>
                            <Link to="../info/article">
                                <div className="container">
                                    <div className="flex w-full overflow-hidden rounded-2xl shadow-md mb-8">
                                        <div className="w-[400px] h-[300px] bg-gray-300">
                                            <img
                                                src="../public/images/mainNews.jpg"
                                                alt=""
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        <div className="flex-1 h-[200px] bg-white p-4 flex flex-col justify-center ps-10">
                                            {/* <p className="text-xl mb-2">
                                        {getPlainText(title)}
                                    </p> */}
                                            {/* <p className="text-black text-xl ">
                                        최근 여행 소식
                                    </p> */}
                                            <TravelNewsSlider />
                                        </div>
                                    </div>
                                </div>
                            </Link>

                            <div>
                                {/* <TripCard
                key={i}
                title={place.title}
                image={place.image}
                description={place.description}
              /> */}
                            </div>
                        </div>
                    </div>
                </>
            </MainLayout>
            <FooterLayout />
        </>
    );
}

export default MainPage;
