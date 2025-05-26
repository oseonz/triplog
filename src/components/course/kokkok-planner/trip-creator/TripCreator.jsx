import React, { useState, useEffect, useMemo } from "react";
import HeaderBar from "../common/HeaderBar";
import TabMenu from "../common/TabMenu";
import SearchBar from "./SearchBar";
import ListBtn from "./ListBtn";
import MapView from "../common/MapView";
import DetailPanel from "./DetailPanel";
import BookMarkPanel from "../bookmarks/BookMarkPanel";
import TripNote from "../trip-note/TripNote";
import { fetchTourPlaces, fetchDetailIntro } from "../../../../api/course";
import { regionList } from "../../../../utils/regionData";

function TripCreator({ currentTab, setCurrentTab }) {
  const [keyword, setKeyword] = useState("");
  const [tourPlaces, setTourPlaces] = useState([]);
  const [foodPlaces, setFoodPlaces] = useState([]);
  const [selectedType, setSelectedType] = useState("12");
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [comment, setComment] = useState("");
  const [courseList, setCourseList] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [mapLevel, setMapLevel] = useState(5);
  const [likedMap, setLikedMap] = useState({});
  const [likeCountMap, setLikeCountMap] = useState({});

  const [mapCenter, setMapCenter] = useState({
    lat: 37.566826,
    lng: 126.9786567,
  });

  const visiblePlaces =
    selectedType === "12"
      ? tourPlaces.slice(0, visibleCount)
      : selectedType === "39"
      ? foodPlaces.slice(0, visibleCount)
      : courseList;

  const region = useMemo(() => {
    return regionList.find((r) => keyword.includes(r.name));
  }, [keyword]);

  useEffect(() => {
    if (region) {
      setMapCenter({ lat: region.lat, lng: region.lng });
    }
  }, [selectedType]);

  useEffect(() => {
    // keyword가 “서울”로 세팅된 직후 한 번 검색 호출
    handleSearch();
  }, []); // 컴포넌트 마운트시에만 실행

  useEffect(() => {
    if (region) {
      setMapCenter({ lat: region.lat, lng: region.lng });
    }
  }, [selectedType]);

  useEffect(() => {
    if (keyword.trim()) {
      handleSearch();
    }
  }, [selectedType]);

  // 탭이 바뀌면 디테일 패널 닫기
  useEffect(() => {
    setSelectedPlace(null);
  }, [currentTab]);

  const handleSearch = async () => {
    try {
      const region = regionList.find((r) => keyword.includes(r.name));
      const areaCode = region?.areaCode ?? null;
      const sigunguCode = region?.sigunguCode ?? null;

      if (region?.lat && region?.lng) {
        setMapCenter({ lat: region.lat, lng: region.lng });
        setMapLevel(5);
      }

      const [tour, food] = await Promise.all([
        fetchTourPlaces("12", 20, areaCode, sigunguCode),
        fetchTourPlaces("39", 20, areaCode, sigunguCode),
      ]);

      setTourPlaces(tour);
      setFoodPlaces(food);
      setVisibleCount(6);
      setSelectedPlace(null);

      const first = tour[0] || food[0];
      if (first) {
        setMapCenter({ lat: Number(first.mapy), lng: Number(first.mapx) });
        setMapLevel(5);
      }
    } catch (error) {
      console.error("❌ 검색 실패", error);
    }
  };

  const handlePlaceClick = async (place) => {
    try {
      const detailData = await fetchDetailIntro(
        place.contentid,
        place.contenttypeid
      );
      const detailPlace = {
        ...place,
        ...(Array.isArray(detailData) ? detailData[0] : detailData),
      };
      setSelectedPlace(detailPlace);
    } catch (error) {
      console.error("❌ 상세정보 병합 실패", error);
      setSelectedPlace(place);
    }
  };

  const handleAddToCourse = () => {
    if (!selectedPlace) return;
    if (courseList.some((item) => item.contentid === selectedPlace.contentid)) {
      alert("이미 추가된 장소입니다!");
      return;
    }
    setCourseList([...courseList, selectedPlace]);
    alert("✅ 코스에 추가되었습니다!");
  };

  const handleRemoveFromCourse = (contentId) => {
    const updated = courseList.filter((place) => place.contentid !== contentId);
    setCourseList(updated);
  };

  const handleCommentSubmit = () => {
    if (comment.trim() !== "") {
      alert(`📝 댓글 작성됨: ${comment}`);
      setComment("");
    }
  };

  const handleLoadMore = () => setVisibleCount((prev) => prev + 6);

  // 하트 클릭 핸들러
  const handleToggleLike = (contentid) => {
    setLikedMap((prev) => ({
      ...prev,
      [contentid]: !prev[contentid], // true <-> false 토글
    }));
  };

  return (
    <div className="flex w-full h-[900px]">
      {/* 왼쪽 영역 */}
      <div className="w-[582px] bg-white flex flex-col  z-10">
        <HeaderBar onBack={() => console.log("뒤로")} />
        <TabMenu currentTab={currentTab} setCurrentTab={setCurrentTab} />

        <div className="border-t-[15px] border-gray-100" />

        {/* ✅ 탭에 따라 다른 콘텐츠 렌더링 */}
        {currentTab === "찜" ? (
          <BookMarkPanel
            isOpen={true}
            onClose={() => setCurrentTab("여행만들기")}
          />
        ) : (
          <>
            {/* ✅ 여행만들기/여행노트 탭 UI */}

            {currentTab === "여행만들기" && (
              <>
                <SearchBar
                  keyword={keyword}
                  setKeyword={setKeyword}
                  onSearch={handleSearch}
                />
                <ListBtn
                  selectedType={selectedType}
                  setSelectedType={setSelectedType}
                  //showCourseList={showCourseList}
                  // setShowCourseList={setShowCourseList}
                />

                <div className="w-full px-4 pb-4 overflow-y-auto">
                  {visiblePlaces.map((place) => {
                    const isAdded = courseList.some(
                      (item) => item.contentid === place.contentid
                    );

                    return (
                      <div
                        key={place.contentid}
                        className="p-3 border mb-3 cursor-pointer shadow-md rounded-lg hover:bg-gray-100"
                        onClick={() => handlePlaceClick(place)}
                      >
                        <div className="flex items-center gap-4">
                          <img
                            src={place.firstimage || "/no_img.jpg"}
                            alt={place.title}
                            className="w-[90px] h-[90px] object-cover rounded-full"
                          />
                          <div className="min-w-0 flex-1 w-[330px]">
                            <p className="font-medium text-xl truncate">
                              {place.title}
                            </p>
                            <p className="text-sm text-gray-600 truncate overflow-hidden">
                              {place.addr1}
                            </p>
                            <img
                              src={
                                likedMap[place.contentid]
                                  ? "/images/i_heart.png"
                                  : "/images/i_heart2.png"
                              }
                              alt="좋아요 하트"
                              onClick={(e) => {
                                e.stopPropagation(); // 클릭 이벤트가 카드 열기로 퍼지는 것 방지
                                handleToggleLike(place.contentid);
                              }}
                              className="w-5 h-5 cursor-pointer"
                            />
                          </div>
                          <input
                            type="checkbox"
                            checked={isAdded}
                            onChange={(e) => {
                              e.stopPropagation();
                              isAdded
                                ? handleRemoveFromCourse(place.contentid)
                                : setCourseList((prev) => [...prev, place]);
                            }}
                            className="w-5 h-5 accent-blue-500"
                          />
                        </div>
                      </div>
                    );
                  })}

                  {visibleCount <
                    (selectedType === "12"
                      ? tourPlaces.length
                      : foodPlaces.length) && (
                    <div className="flex justify-center items-center mt-4">
                      <button
                        onClick={handleLoadMore}
                        className="w-[100px] bg-blue-400 text-white py-2 rounded-3xl hover:bg-blue-500"
                      >
                        더보기1 +
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </>
        )}
      </div>

      {/* 오른쪽 MapView는 항상 유지 */}
      <MapView
        places={[...tourPlaces, ...foodPlaces]}
        center={mapCenter}
        level={mapLevel}
        addedCourses={courseList}
        onRemoveCourse={handleRemoveFromCourse}
        onMarkerClick={setSelectedPlace}
        selectedType={selectedType}
      />

      {/* 디테일 패널 */}
      <DetailPanel
        place={selectedPlace}
        onClose={() => setSelectedPlace(null)}
        onAddCourse={handleAddToCourse}
        comment={comment}
        setComment={setComment}
        onCommentSubmit={handleCommentSubmit}
        onRemoveCourse={handleRemoveFromCourse}
        isCourseAdded={courseList.some(
          (p) => p.contentid === selectedPlace?.contentid
        )}
      />
    </div>
  );
}

export default TripCreator;
