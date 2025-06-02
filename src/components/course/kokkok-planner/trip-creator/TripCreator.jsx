import React, { useState, useEffect, useMemo } from 'react';
import SearchBar from './SearchBar';
import ListBtn from './ListBtn';
import MapView from '../common/MapView';
import DetailPanel from './DetailPanel';
import BookMarkPanel from '../bookmarks/BookMarkPanel';
import TripNote from '../trip-note/TripNote';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { courseDataState } from '../../../../pages/course/atom/courseState';
import { Link, useNavigate } from 'react-router-dom';
import TabMenu from '../common/TabMenu';
import ListViewComp from './ListViewComp';

function TripCreator() {
    const [selectedType, setSelectedType] = useState('12');
    const [tripTitle, setTripTitle] = useState('');
    const [currentTab, setCurrentTab] = useState('콕콕검색');
    const [tourVisibleCount, setTourVisibleCount] = useState(6);
    const [foodVisibleCount, setFoodVisibleCount] = useState(6);
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [courseList, setCourseList] = useState([]);
    const [mapCenter, setMapCenter] = useState({
        lat: 37.566826,
        lng: 126.9786567,
    });
    const [mapLevel, setMapLevel] = useState(5);
    const navigate = useNavigate();

    const courseData = useRecoilValue(courseDataState);
    const setCourseData = useSetRecoilState(courseDataState);

    const tourPlaces = courseData.typeOneList || [];
    const foodPlaces = courseData.typeTwoList || [];

    const visibleList =
        selectedType == '12'
            ? (courseData.typeOneList || []).slice(0, tourVisibleCount)
            : (courseData.typeTwoListv || []).slice(0, foodVisibleCount);

    const resetVisibleCounts = () => {
        setTourVisibleCount(6);
        setFoodVisibleCount(6);
    };

    const handleBack = () => navigate(-1);

    const [loading, setLoading] = useState(false);

    const handleLike = (contentid) => {
        console.log(contentid);
        const listKey = selectedType == '12' ? 'typeOneList' : 'typeTwoList';
        setCourseData((prevData) => ({
            ...prevData,
            [listKey]: prevData[listKey].map((item) =>
                item.contentid === contentid
                    ? {
                          ...item,
                          likes_count: item.mylike
                              ? item.likes_count - 1
                              : item.likes_count + 1,
                          mylike: !item.mylike,
                      }
                    : item,
            ),
        }));

        // postLike(userid,contendid,likes_count)
        // axios
    };

    const handleFavorite = (contentid) => {
        console.log('찜', contentid);
        const favoriteKey =
            selectedType == '12' ? 'typeOneList' : 'typeTwoList';
        setCourseData((prevData) => ({
            ...prevData,
            [favoriteKey]: prevData[favoriteKey].map((item) =>
                item.contentid === contentid
                    ? { ...item, favorite: !item.favorite }
                    : item,
            ),
        }));
        //postFavori()
    };

    return (
        <div className="flex w-full h-[900px]">
            {/* 왼쪽 영역 */}
            <div className="w-[430px] bg-white flex flex-col z-10">
                <div className="flex justify-between items-center px-3 py-4 border-b bg-white">
                    <button
                        onClick={handleBack}
                        className="text-xl font-semibold flex items-center gap-1 text-gray-800"
                    >
                        <span className="text-xl">
                            <Link to="/">←</Link>
                        </span>{' '}
                        콕콕플래너
                    </button>
                    <div className="p-2 flex justify-center">
                        <input
                            type="text"
                            className="w-[265px] border p-2 rounded text-lg font-normal"
                            placeholder="코스 제목을 입력하세요."
                            value={tripTitle}
                            onChange={(e) => setTripTitle(e.target.value)}
                        />
                    </div>
                </div>

                <TabMenu
                    currentTab={currentTab}
                    setCurrentTab={setCurrentTab}
                />
                <div className="border-t-[10px] border-gray-100" />

                {currentTab === '찜' ? (
                    <BookMarkPanel
                        isOpen={true}
                        onClose={() => setCurrentTab('콕콕코스')}
                    />
                ) : currentTab === '여행노트' ? (
                    <TripNote />
                ) : currentTab === '콕콕코스' ? (
                    <div className="px-4 py-4">
                        <h2 className="text-xl font-bold mb-2">
                            📌 나의 콕콕코스
                        </h2>
                        {/* 콕콕코스 관련 콘텐츠를 여기에 추가 */}
                        <p>내가 만든 여행 코스를 보여주는 공간입니다.</p>
                    </div>
                ) : (
                    <>
                        <SearchBar
                            selectedType={selectedType}
                            onSearchReset={resetVisibleCounts}
                        />
                        <ListBtn
                            typeButton={selectedType}
                            tourTypeId={(type1) => {
                                console.log('🍔 버튼 눌림:', type1);
                                setSelectedType(type1);
                            }}
                        />
                        <div className="relative">
                            {loading && (
                                <div className="absolute inset-0 bg-white bg-opacity-60 flex justify-center items-center z-10">
                                    <span className="text-lg font-semibold">
                                        불러오는 중...
                                    </span>
                                </div>
                            )}
                            <div className="full px-4 pb-4 ">
                                {visibleList.map((item) => (
                                    <ListViewComp
                                        key={item.contentid}
                                        place={item}
                                        checkLike={handleLike}
                                        checkFavorite={handleFavorite}
                                    />
                                ))}
                            </div>
                            <div className="flex justify-center">
                                <button
                                    className="w-[100px] bg-blue-500 text-white py-2 rounded-3xl hover:bg-blue-500 "
                                    onClick={() => {
                                        if (selectedType == '12') {
                                            setTourVisibleCount(
                                                (prev) => prev + 6,
                                            );
                                        } else {
                                            setFoodVisibleCount(
                                                (prev) => prev + 6,
                                            );
                                        }
                                    }}
                                >
                                    더보기
                                </button>
                            </div>

                            <div className="bg-red-400 h-3"></div>

                            {visibleList.map((more) => {
                                const isAdded = courseList.some(
                                    (item) =>
                                        item.contentid === place.contentid,
                                );
                                return (
                                    <div>
                                        <pre>
                                            {JSON.stringify(
                                                courseData,
                                                null,
                                                2,
                                            )}
                                        </pre>
                                    </div>
                                );
                            })}
                        </div>
                    </>
                )}
            </div>

            {/* 오른쪽 지도 영역 */}
            {/* <MapView
        center={mapCenter}
        level={mapLevel}
        selectedType={selectedType}
        addedCourses={courseList}
        onMarkerClick={setSelectedPlace}
      /> */}

            {/* 상세 정보 패널 */}
            {isDetailOpen && (
                <DetailPanel onClose={() => setIsDetailOpen(false)} />
            )}
        </div>
    );
}

export default TripCreator;
