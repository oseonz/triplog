import React, { useState, useEffect, useMemo } from "react";
import HeaderBar from "../common/HeaderBar";
import TabMenu from "../common/TabMenu";
import SearchBar from "../trip-creator/SearchBar";
import ListBtn from "../trip-creator/ListBtn";
import MapView from "../common/MapView";
//import DetailPanel from "../trip-creator/DetailPanel";
import { fetchTourPlaces } from "../../../../api/course";
import { regionList } from "../../../../utils/regionData";
import { fetchDetailIntro } from "../../../../api/course";
//import BookmarkPanel from "../bookmarks/BookMarkPanel.jsx";

function BookmarkList({ currentTab, setCurrentTab }) {
  const [keyword, setKeyword] = useState("");
  const [places, setPlaces] = useState([]);
  const [tourPlaces, setTourPlaces] = useState([]); // 여행지 (contentTypeId: 12)
  const [foodPlaces, setFoodPlaces] = useState([]); // 음식점 (contentTypeId: 39)
  const [selectedType, setSelectedType] = useState("12"); // 리스트 필터용
  //const [selectedId, setSelectedId] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [comment, setComment] = useState("");
  const [courseList, setCourseList] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6); // 보여줄 여행지 개수
  const [mapLevel, setMapLevel] = useState(5); // 지도 줌 레벨
  const [showCourseList, setShowCourseList] = useState(false); //코스 추가된 리스트
  const [mapCenter, setMapCenter] = useState({
    lat: 37.566826,
    lng: 126.9786567,
  });

  // 마커에서 받아온 선택된 ID 기반으로 장소 정보 찾기
  //const allPlaces = [...tourPlaces, ...foodPlaces]; // 리스트 합치기
  //const selectedPlace = allPlaces.find((p) => p.contentid === selectedId);

  // 일정 + 제목 입력용 상태
  const [tripTitle, setTripTitle] = useState("");
  const [duration, setDuration] = useState("당일여행");

  const visiblePlaces =
    selectedType === "12"
      ? tourPlaces.slice(0, visibleCount)
      : selectedType === "39"
      ? foodPlaces.slice(0, visibleCount)
      : courseList; // selectedType === "course"일 때

  const region = useMemo(() => {
    return regionList.find((r) => keyword.includes(r.name));
  }, [keyword]);

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

  // 코스에 여행지 추가
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

  const handleSearch = async () => {
    try {
      // ✅ 키워드에서 지역명 추출
      const region = regionList.find((r) => keyword.includes(r.name));
      const areaCode = region?.areaCode ?? null;
      const sigunguCode = region?.sigunguCode ?? null;

      // 지도 중심 이동 (좌표가 있으면)
      if (region?.lat && region?.lng) {
        setMapCenter({ lat: region.lat, lng: region.lng });
        setMapLevel(5); // 초기 줌
      }

      // ✅ 관광지 + 음식점 모두 fetch (Promise.all 병렬 처리)
      const [tour, food] = await Promise.all([
        fetchTourPlaces("12", 20, areaCode, sigunguCode), // 관광지
        fetchTourPlaces("39", 20, areaCode, sigunguCode), // 음식점
      ]);

      // 상태 업데이트
      setTourPlaces(tour);
      setFoodPlaces(food);
      setVisibleCount(6);
      setSelectedPlace(null);

      // 지도 중심 다시 한 번 조정 (데이터가 있으면)
      const first = tour[0] || food[0];
      if (first) {
        setMapCenter({
          lat: Number(first.mapy),
          lng: Number(first.mapx),
        });
        setMapLevel(5);
      }
    } catch (error) {
      console.error("❌ 검색 실패", error);
    }
  };

  const handleLoadMore = () => setVisibleCount((prev) => prev + 6);

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

  const renderedPlaceList = visiblePlaces.map((place) => {
    const isAdded = courseList.some(
      (item) => item.contentid === place.contentid
    );

    const handleCheckboxClick = (e) => {
      e.stopPropagation();
      if (isAdded) {
        handleRemoveFromCourse(place.contentid);
      } else {
        setCourseList((prev) => [...prev, place]);
      }
    };

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
            className="w-24 h-24 object-cover rounded-full"
          />
          <div className="min-w-0 flex-1 w-[350px]">
            <p className="font-medium text-xl truncate">{place.title}</p>
            <p className="text-sm text-gray-600 truncate overflow-hidden">
              {place.addr1}
            </p>
          </div>
          <input
            type="checkbox"
            checked={isAdded}
            onChange={handleCheckboxClick}
            className="w-5 h-5 accent-blue-500"
          />
        </div>
      </div>
    );
  });
  return (
    <div className="flex w-full h-screen">
      {/* 콕콕플래서 상단 */}
      <div className="w-[550px] bg-white flex flex-col relative z-10 ">
        <HeaderBar onBack={() => console.log("뒤로")} />
        {/*1. 탭 메뉴 */}
        <TabMenu currentTab={currentTab} setCurrentTab={setCurrentTab} />
        {/* 2. 코스 제목 */}
        <div className="p-4 flex justify-center">
          <div className="flex align-center gap-2  items-center">
            <span className="bg-blue-200 p-2 rounded-xl ">코스제목</span>
            <input
              type="text"
              className="w-[320px] border p-2 rounded  text-sm h-[40px]"
              placeholder="코스 제목을 입력하세요"
              value={tripTitle}
              onChange={(e) => setTripTitle(e.target.value)}
            />
          </div>
        </div>
        {/* 🔻 회색 실선 추가 */}
        <div className="border-t-[15px] border-gray-100 " />
        {/* 4. 여행지/음식점 버튼 */}
        <ListBtn
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          showCourseList={showCourseList} // ✅ 추가
          setShowCourseList={setShowCourseList} // ✅ 추가
        />
        {/* 3. 검색바 */}
        <SearchBar
          keyword={keyword}
          setKeyword={setKeyword}
          onSearch={handleSearch}
        />
        {/* ✅ 추가한 코스 리스트 출력 */}
        {showCourseList && (
          <div className="px-4 pb-2">
            <p className="text-sm text-gray-600 mb-2">📌 내가 담은 코스 목록</p>
            {courseList.length === 0 ? (
              <p className="text-gray-400">아직 코스에 추가한 장소가 없어요.</p>
            ) : (
              <ul className="space-y-2">
                {courseList.map((place) => (
                  <li
                    key={place.contentid}
                    className="border p-2 rounded-md shadow-sm bg-gray-50 flex justify-between items-center"
                  ></li>
                ))}
              </ul>
            )}
          </div>
        )}
        <div className="w-full px-4 pb-4 overflow-y-auto">
          {renderedPlaceList}

          {visibleCount <
            (selectedType === "12" ? tourPlaces.length : foodPlaces.length) && (
            <div className="flex justify-center items-center mt-4">
              <button
                onClick={handleLoadMore}
                className="w-[100px] bg-blue-400 text-white py-2 rounded-3xl hover:bg-blue-500 flex justify-center items-center"
              >
                더보기 +
              </button>
            </div>
          )}
        </div>
      </div>

      {/*6. 지도영역 */}
      <MapView
        places={[...tourPlaces, ...foodPlaces]}
        center={mapCenter}
        level={mapLevel}
        addedCourses={courseList}
        onRemoveCourse={handleRemoveFromCourse}
        onMarkerClick={setSelectedPlace}
        selectedType={selectedType}
      />
    </div>
  );
}

export default BookmarkList;
