import React, { useState, useEffect, useMemo } from "react";
import HeaderBar from "../common/HeaderBar";
import TabMenu from "../common/TabMenu";
import SearchBar from "./SearchBar";
import ListBtn from "./ListBtn";
import MapView from "../common/MapView";
import DetailPanel from "./DetailPanel";
import BookMarkPanel from "../bookmarks/BookMarkPanel";
import TripNote from "../trip-note/TripNote";
import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";
import { courseDataState } from "../../../../pages/course/atom/courseState";
import { regionList } from "../../../../utils/regionData";
import { detailIntro } from "../../atom/detailIntro";
import { searchResultState, keywordState } from "../../atom/searchState";

function TripCreator({ currentTab, setCurrentTab }) {
  const [selectedType, setSelectedType] = useState("12");
  const [comment, setComment] = useState("");
  const [visibleCount, setVisibleCount] = useState(6);
  const [mapLevel, setMapLevel] = useState(5);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [courseList, setCourseList] = useState([]);
  const [courseData, setCourseData] = useRecoilState(courseDataState);
  const setSelectedPlace = useSetRecoilState(detailIntro);
  const { tourPlaces, foodPlaces, likesMap, bookmarkedIds } = courseData;
  const searchResults = useRecoilValue(searchResultState);
  const keyword = useRecoilValue(keywordState);
  const [mapCenter, setMapCenter] = useState({
    lat: 37.566826,
    lng: 126.9786567,
  });

  const visiblePlaces =
    selectedType === "12"
      ? courseData.tourPlaces.slice(0, visibleCount)
      : selectedType === "39"
      ? courseData.foodPlaces.slice(0, visibleCount)
      : courseList;

  const region = useMemo(() => {
    return regionList.find((r) => keyword.includes(r.name));
  }, [keyword]);

  // 좋아요 수를 미리 불러오는 함수
  const preloadLikes = async (places) => {
    const counts = {};
    const failedSet = new Set();

    for (const place of places) {
      const id = place?.contentid;
      if (!id) continue;

      try {
        const count = await fetchLikeCount(id);
        counts[id] = count;
      } catch (err) {
        if (!failedSet.has(place.title)) {
          // console.warn("❌ 좋아요 수 로딩 실패:", place.title);
          failedSet.add(place.title);
        }
        counts[id] = 0;
      }
    }

    // ✅ place가 아니라 counts를 통째로 반영해야 함
    setCourseData((prev) => ({
      ...prev,
      likesMap: {
        ...prev.likesMap,
        ...likesMap,
      },
    }));
  };

  useEffect(() => {
    if (region) {
      setMapCenter({ lat: region.lat, lng: region.lng });
    }
  }, [selectedType]);

  // 컴포넌트가 처음 마운트될 때만 실행
  useEffect(() => {}, []);

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

  // 초기 데이터 로딩
  // console.log("🧩 courseDataState:", {
  //   tourPlaces,
  //   foodPlaces,
  //   likesMap,
  //   bookmarkedIds,
  // });

  const handleSearch = () => {
    const region = regionList.find((r) => keyword.includes(r.name));
    const areaCode = region?.areaCode ?? null;
    const sigunguCode = region?.sigunguCode ?? null;

    if (region?.lat && region?.lng) {
      setMapCenter({ lat: region.lat, lng: region.lng });
      setMapLevel(5);
    }

    setVisibleCount(6);
    setSelectedPlace(null);

    const first = selectedType === "12" ? tourPlaces[0] : foodPlaces[0];
    if (first) {
      setMapCenter({ lat: Number(first.mapy), lng: Number(first.mapx) });
      setMapLevel(5);
    }
  };

  // 디테일패널 핸들러
  const handlePlaceClick = (place) => {
    const allPlaces = [...courseData.tourPlaces, ...courseData.foodPlaces];

    const detailPlace = allPlaces.find(
      (item) => item.contentid === place.contentid
    );

    if (detailPlace) {
      setSelectedPlace(detailPlace); // ✅ 선택된 장소를 Recoil 상태에 저장
      setIsDetailOpen(true); // 패널을 열기 위한 내부 상태
    } else {
      console.warn("❌ 상세 데이터를 찾을 수 없음:", place.title);
    }
  };

  //코스에 장소 추가 핸들러
  // const handleAddToCourse = () => {
  //   if (!selectedPlace) return;
  //   if (courseList.some((item) => item.contentid === selectedPlace.contentid)) {
  //     alert("이미 추가된 장소입니다!");
  //     return;
  //   }
  //   setCourseList([...courseList, selectedPlace]);
  //   alert("✅ 코스에 추가되었습니다!");
  // };

  // 코스에서 장소 제거 핸들러
  const handleRemoveFromCourse = (contentId) => {
    const updated = courseList.filter((place) => place.contentid !== contentId);
    setCourseList(updated);
  };

  // 댓글 작성 핸들러
  const handleCommentSubmit = () => {
    if (comment.trim() !== "") {
      alert(`📝 댓글 작성됨: ${comment}`);
      setComment("");
    }
  };

  // 더보기 버튼 핸들러
  const handleLoadMore = () => setVisibleCount((prev) => prev + 6);

  // 하트 클릭 핸들러
  const handleToggleLike = async (place) => {
    try {
      await saveLike({ ...place, user_id: 1 }); // 서버에 좋아요 토글
      const updatedCount = await fetchLikeCount(place.contentid); // 최신 좋아요 수

      // ✅ 기존 값 가져오기
      const prevCount = courseData.likesMap[place.contentid] ?? 0;

      // ✅ 값이 실제로 바뀐 경우에만 업데이트
      if (updatedCount !== prevCount) {
        setCourseData((prev) => ({
          ...prev,
          likesMap: {
            ...prev.likesMap,
            [place.contentid]: updatedCount,
          },
        }));
      }
    } catch (err) {
      console.error("❌ 좋아요 처리 실패", err);
    }
  };

  useEffect(() => {
    const allPlaces = [...tourPlaces, ...foodPlaces];
    if (allPlaces.length > 0) {
      preloadLikes(allPlaces);
    }
  }, []);

  return (
    <div className="flex w-full h-[900px]">
      {/* 왼쪽 영역 */}
      <div className="w-[570px] bg-white flex flex-col  z-10">
        <HeaderBar onBack={() => console.log("뒤로")} />

        <TabMenu currentTab={currentTab} setCurrentTab={setCurrentTab} />

        <div className="border-t-[10px] border-gray-100" />

        {/* ✅ 탭에 따라 다른 콘텐츠 렌더링 */}
        {currentTab === "찜" ? (
          <BookMarkPanel
            isOpen={true}
            onClose={() => setCurrentTab("여행만들기")}
          />
        ) : currentTab === "여행노트" ? (
          <TripNote />
        ) : (
          <>
            {currentTab === "여행만들기" && (
              <>
                <SearchBar />
                <ListBtn
                  selectedType={selectedType}
                  setSelectedType={setSelectedType}
                />

                <div className="w-full px-4 pb-4 ">
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
                          <div className="min-w-0 flex-1 w-[320px]">
                            <p className="font-medium text-xl truncate">
                              {place.title}
                            </p>
                            <p className="text-sm text-gray-600 truncate overflow-hidden">
                              {place.addr1}
                            </p>
                            <div className="flex items-center mt-1 gap-1">
                              <img
                                src={
                                  (likesMap[place.contentid] ?? 0) > 0
                                    ? "/images/i_heart2.png"
                                    : "/images/i_heart.png"
                                }
                                alt="좋아요 하트"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleToggleLike(place);
                                }}
                                className="w-5 h-5 cursor-pointer"
                              />
                              <span className=" text-sm text-gray-500">
                                {likesMap[place.contentid] ?? 0}
                              </span>
                            </div>
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
                        className="w-[100px] bg-blue-500 text-white py-2 rounded-3xl hover:bg-blue-500"
                      >
                        더보기 +
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
        places={[...tourPlaces, ...foodPlaces]} // ✅ Recoil 값 기반
        center={mapCenter}
        level={mapLevel}
        addedCourses={courseList}
        onRemoveCourse={handleRemoveFromCourse}
        onMarkerClick={setSelectedPlace}
        selectedType={selectedType}
      />
      {/* 디테일 패널 */}
      {isDetailOpen && <DetailPanel onClose={() => setIsDetailOpen(false)} />}
    </div>
  );
}

export default TripCreator;
