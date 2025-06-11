import React, { useState, useEffect, useMemo } from 'react';
import SearchBar from './SearchBar';
import ListBtn from './ListBtn';
import MapView from '../common/MapView';
import DetailPanel from './DetailPanel';
import BookMarkPanel from '../bookmarks/BookMarkPanel';
import TripNote from '../trip-note/TripNote';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
    courseDataState,
    courseListState,
    selectedPlaceState,
    favoriteListState,
    searchKeywordState,
    searchResultState,
} from '../../../../pages/course/atom/courseState';
import { Link, useNavigate } from 'react-router-dom';
import TabMenu from '../common/TabMenu';
import ListViewComp from './ListViewComp';
import {
    saveCourse,
    saveFavorite,
    deleteFavorite,
    deleteLike,
    postLike,
} from '../../../../api/course/tourBackApi';
import { userState } from '../../../../pages/mypage/atom/userState';

function TripCreator() {
    const [selectedType, setSelectedType] = useState('12');
    const [tripTitle, setTripTitle] = useState('');
    const [currentTab, setCurrentTab] = useState('콕콕검색');
    const [tourVisibleCount, setTourVisibleCount] = useState(5);
    const [foodVisibleCount, setFoodVisibleCount] = useState(5);
    const [mapCenter, setMapCenter] = useState({
        lat: 37.566826,
        lng: 126.9786567,
    });
    const [mapLevel, setMapLevel] = useState(5);
    const navigate = useNavigate();

    const courseData = useRecoilValue(courseDataState);
    const setCourseData = useSetRecoilState(courseDataState);
    const setSelectedPlace = useSetRecoilState(selectedPlaceState);
    const selectedPlace = useRecoilValue(selectedPlaceState);
    const [courseList, setCourseList] = useRecoilState(courseListState);
    const setFavoriteList = useSetRecoilState(favoriteListState);
    const favoriteList = useRecoilValue(favoriteListState);
    const keyword = useRecoilValue(searchKeywordState);
    const result = useRecoilValue(searchResultState);
    const searchResult = useRecoilValue(searchResultState);
    const user = useRecoilValue(userState);

    const [note, setNote] = useState({
        schedule: '',
        transport: '',
        budget: '',
        stay: '',
        memo: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNote((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // ✅ 1. 개별 타입별 visible 리스트 정의
    const visibleTourList = (courseData.typeOneList || []).slice(
        0,
        tourVisibleCount,
    );
    const visibleFoodList = (courseData.typeTwoList || []).slice(
        0,
        foodVisibleCount,
    );

    // ✅ 2. 맵 마커용으로 둘 다 합친 리스트 생성
    const mapVisiblePlaces = [...visibleTourList, ...visibleFoodList];
    const allMapMarkers = [...mapVisiblePlaces, ...favoriteList];
    const dedupedMarkers = allMapMarkers.reduce((acc, curr) => {
        if (!acc.some((item) => item.contentid === curr.contentid)) {
            acc.push(curr);
        }
        return acc;
    }, []);

    // ✅ 3. 현재 탭에서 보여줄 리스트 (카드 출력용)
    const visibleList =
        selectedType === '12' ? courseData.typeOneList : courseData.typeTwoList;

    const resetVisibleCounts = () => {
        setTourVisibleCount(6);
        setFoodVisibleCount(6);
    };

    const handleBack = () => navigate(-1);

    const [loading, setLoading] = useState(false);

    const handleTabChange = (tabName) => {
        setCurrentTab(tabName); // 기존 탭 변경
        setSelectedPlace(null); // ✅ 디테일 패널 닫기
    };

    const handleLike = async (contentid) => {
        console.log(contentid);
        // const listKey = selectedType == '12' ? 'typeOneList' : 'typeTwoList';
        const user_id = user?.id;
        // 1️⃣ 현재 값 찾기
        const item = [
            ...courseData.typeOneList,
            ...courseData.typeTwoList,
            ...courseList, // 혹시 코스에만 있을 수도 있으니까
        ].find((p) => p.contentid === contentid);

        if (!item) return;

        const wasLiked = !!item.mylike;
        const newLikeValue = !wasLiked;
        const likeDiff = newLikeValue ? 1 : -1;
        const alreadyBookmarked = !!item.favorite;
        // 2️⃣ 검색 탭 상태 업데이트
        setCourseData((prev) => {
            const update = (list) =>
                list.map((p) =>
                    p.contentid === contentid
                        ? {
                              ...p,
                              mylike: newLikeValue,
                              likes_count: (p.likes_count || 0) + likeDiff,
                          }
                        : p,
                );
            return {
                ...prev,
                typeOneList: update(prev.typeOneList || []),
                typeTwoList: update(prev.typeTwoList || []),
            };
        });

        // 3️⃣ 코스 탭 상태도 동일하게 업데이트
        setCourseList((prevList) =>
            prevList.map((p) =>
                p.contentid === contentid
                    ? {
                          ...p,
                          mylike: newLikeValue,
                          likes_count: (p.likes_count || 0) + likeDiff,
                      }
                    : p,
            ),
        );

        // ✅ 찜 탭 업데이트 (핵심 추가!)
        setFavoriteList((prevList) =>
            prevList.map((p) =>
                p.contentid === contentid
                    ? {
                          ...p,
                          favorite: !alreadyBookmarked,
                          likes_count: (p.likes_count || 0) + likeDiff,
                          mylike: newLikeValue,
                      }
                    : p,
            ),
        );
        // ✅ 4. 서버에 좋아요 등록/삭제 요청
        try {
            if (newLikeValue) {
                await postLike({ user_id, contentid });
                console.log('✅ 좋아요 등록됨', contentid);
            } else {
                await deleteLike(user_id, contentid);
                console.log('🗑️ 좋아요 삭제됨', contentid);
            }
        } catch (err) {
            console.error('❌ 좋아요 처리 실패:', err);
        }
    };

    //찜 아이콘 핸들러
    const handleFavorite = async (contentid) => {
        const item = [
            ...courseData.typeOneList,
            ...courseData.typeTwoList,
        ].find((p) => p.contentid === contentid);
        if (!item) return;
        console.log('삭제', item.favorite);

        const alreadyBookmarked = !!item.favorite;

        // 1. UI 상태 업데이트
        setCourseData((prev) => {
            const update = (list) =>
                list.map((p) =>
                    p.contentid === contentid
                        ? { ...p, favorite: !alreadyBookmarked }
                        : p,
                );
            return {
                ...prev,
                typeOneList: update(prev.typeOneList || []),
                typeTwoList: update(prev.typeTwoList || []),
            };
        });

        setCourseList((prevList) =>
            prevList.map((p) =>
                p.contentid === contentid
                    ? { ...p, favorite: !alreadyBookmarked }
                    : p,
            ),
        );

        // 2. Recoil 찜 리스트 반영
        setFavoriteList((prev) => {
            const exists = prev.some((f) => f.contentid === contentid);
            return exists
                ? prev.filter((f) => f.contentid !== contentid)
                : [...prev, item];
        });

        // 3. 서버 저장 / 삭제 요청
        try {
            if (alreadyBookmarked) {
                await deleteFavorite(user.id, contentid);

                console.log('🗑️ 찜 삭제 완료');
            } else {
                await saveFavorite({
                    user_id: user.id,
                    contentid: item.contentid,
                    contenttypeid: item.contenttypeid,
                    title: item.title,
                    addr: item.addr1,
                    areacode: item.areacode,
                    sigungucode: item.sigungucode,
                    firstimage: item.firstimage || '이미지가 없떠여',
                });
                console.log('✅ 찜 저장', contentid);
            }
        } catch (err) {
            console.error('❌ 찜 처리 실패:', err);
        }
    };

    const handleSaveCourse = async () => {
        if (courseList.length === 0) {
            alert('저장할 코스가 없습니다!');
            return;
        }

        try {
            const payload = {
                creator_user_id: 5, // ✍️ 로그인한 사용자 ID로 교체 필요
                course_name: tripTitle,
                description: `${note.schedule}||${note.budget}||${note.memo}||${note.transport}||${note.stay}`,
                contents: courseList.map((place) => ({
                    contentid: place.contentid,
                    contenttypeid: place.contenttypeid,
                    title: place.title,
                    addr: place.addr1,
                    titleImage: null, // 아직은 사용 안 함
                    areacode: place.areacode,
                    sigungucode: place.sigungucode,
                    firstimage: place.firstimage,
                })),
            };

            const result = await saveCourse(payload);
            console.log('✅ 저장 결과:', result);
            alert('코스 저장이 완료되었습니다!');
        } catch (err) {
            console.error('❌ 코스 저장 실패:', err);
            alert('코스 저장 중 오류가 발생했습니다.');
        }
    };

    useEffect(() => {
        if (currentTab === '콕콕검색' && keyword) {
            const selectedList =
                selectedType === '12'
                    ? searchResult.typeOneList
                    : searchResult.typeTwoList;

            // ✅ 찜 정보 덧씌우기
            const favIds = new Set(favoriteList.map((item) => item.contentid));
            const enrichedList = (selectedList || []).map((item) => ({
                ...item,
                favorite: favIds.has(item.contentid),
            }));

            // ✅ 리스트 반영
            setCourseData((prev) => ({
                ...prev,
                [selectedType === '12' ? 'typeOneList' : 'typeTwoList']:
                    enrichedList,
            }));
        }
    }, [currentTab, keyword, selectedType, favoriteList, courseList]);

    return (
        <div className="flex w-full h-[900px] overflow-hidden">
            {/* 왼쪽 영역 */}

            <div className="w-[550px] bg-white flex flex-col z-10">
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
                    setCurrentTab={handleTabChange}
                />
                <div className="border-t-[10px] border-gray-100" />

                {currentTab === '찜' ? (
                    <BookMarkPanel
                        isOpen={true}
                        onClose={() => setCurrentTab('콕콕코스')}
                        checkLike={handleLike}
                        checkFavorite={handleFavorite}
                    />
                ) : currentTab === '여행노트' ? (
                    <TripNote notedata={note} handleChange={handleChange} />
                ) : currentTab === '콕콕코스' ? (
                    <div className="px-3 py-3">
                        <h2 className="text-xl font-bold mb-2">
                            📌 나의 콕콕코스
                        </h2>
                        <div className="h-[680px] overflow-y-auto">
                            {courseList.map((item) => (
                                <ListViewComp
                                    cardType="two"
                                    key={item.contentid}
                                    place={item}
                                    checkLike={handleLike}
                                    checkFavorite={handleFavorite}
                                />
                            ))}
                        </div>
                    </div>
                ) : (
                    <>
                        <SearchBar
                            selectedType={selectedType}
                            onSearchReset={resetVisibleCounts}
                            setMapCenter={setMapCenter}
                            setMapLevel={setMapLevel}
                            setSelectedType={setSelectedType}
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
                            <div className="px-4 pb-4 h-[650px] overflow-y-auto ">
                                {(visibleList || []).map((place) => (
                                    <ListViewComp
                                        cardType="one"
                                        key={place.contentid}
                                        checkLike={handleLike}
                                        checkFavorite={handleFavorite}
                                        listdata={visibleList}
                                        place={place}
                                    />
                                ))}
                                <div className="flex justify-center">
                                    <button
                                        className="w-[100px] bg-blue-500 text-white py-2 rounded-3xl hover:bg-blue-500  "
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
                            </div>
                        </div>
                    </>
                )}
            </div>

            {/* 오른쪽 지도 영역 */}
            <MapView
                center={mapCenter}
                level={mapLevel}
                selectedType={selectedType}
                checkCourse={courseList} // 선 연결
                onMarkerClick={setSelectedPlace}
                //visiblePlaces={mapVisiblePlaces} //더보기 연동
                onSaveCourse={handleSaveCourse} // 저장하기
                visiblePlaces={dedupedMarkers}
            />

            {/* 상세 정보 패널 */}
            {selectedPlace && <DetailPanel />}
        </div>
    );
}

export default TripCreator;
