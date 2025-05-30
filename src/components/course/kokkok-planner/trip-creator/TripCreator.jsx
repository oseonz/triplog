import React, { useState, useEffect, useMemo } from "react";
import SearchBar from "./SearchBar";
import ListBtn from "./ListBtn";
import MapView from "../common/MapView";
import DetailPanel from "./DetailPanel";
import BookMarkPanel from "../bookmarks/BookMarkPanel";
import TripNote from "../trip-note/TripNote";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { courseDataState } from "../../../../pages/course/atom/courseState";
import { Link, useNavigate } from "react-router-dom";
import TabMenu from "../common/TabMenu";
import ListViewComp from "./ListViewComp";

function TripCreator() {
  const [selectedType, setSelectedType] = useState("12");
  const [tripTitle, setTripTitle] = useState("");
  const [currentTab, setCurrentTab] = useState("콕콕검색");
  const [visibleCount, setVisibleCount] = useState(6);
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

  const visiblePlaces = useMemo(() => {
    return selectedType === "12"
      ? tourPlaces.slice(0, visibleCount)
      : foodPlaces.slice(0, visibleCount);
  }, [selectedType, visibleCount, tourPlaces, foodPlaces]);

  const handleBack = () => navigate(-1);

  // const handlePlaceClick = (place) => {
  //   setSelectedPlace(place);
  //   setIsDetailOpen(true);
  // };

  // const handleRemoveFromCourse = (contentId) => {
  //   const updated = courseList.filter((place) => place.contentid !== contentId);
  //   setCourseList(updated);
  // };

  const handleLike = (contentid) => {
    console.log(contentid);
    setCourseData((prevData) => ({
      ...prevData,
      typeOneList: prevData.typeOneList.map((item) =>
        item.contentid === contentid
          ? {
              ...item,
              likes_count: item.mylike
                ? item.likes_count - 1
                : item.likes_count + 1,
              mylike: !item.mylike,
            }
          : item
      ),
    }));

    // postLike(userid,contendid,likes_count)
    // axios
  };

  const handleFavorite = (contentid) => {
    console.log("찜", contentid);
    setCourseData((prevData) => ({
      ...prevData,
      typeOneList: prevData.typeOneList.map((item) =>
        item.contentid === contentid
          ? { ...item, favorite: !item.favorite }
          : item
      ),
    }));
    //postFavori()
  };

  const handleLoadMore = () => setVisibleCount((prev) => prev + 6);

  return (
    <div className="flex w-full h-[900px]">
      {/* 왼쪽 영역 */}
      <div className="w-[460px] bg-white flex flex-col z-10">
        <div className="flex justify-between items-center px-5 py-4 border-b bg-white">
          <button
            onClick={handleBack}
            className="text-xl font-semibold flex items-center gap-1 text-gray-800"
          >
            <span className="text-xl">
              <Link to="/">←</Link>
            </span>{" "}
            콕콕플래너
          </button>
          <div className="p-2 flex justify-center">
            <input
              type="text"
              className="w-[260px] border p-2 rounded text-lg font-normal"
              placeholder="코스 제목을 입력하세요."
              value={tripTitle}
              onChange={(e) => setTripTitle(e.target.value)}
            />
          </div>
        </div>

        <TabMenu currentTab={currentTab} setCurrentTab={setCurrentTab} />
        <div className="border-t-[10px] border-gray-100" />

        {currentTab === "찜" ? (
          <BookMarkPanel
            isOpen={true}
            onClose={() => setCurrentTab("콕콕코스")}
          />
        ) : currentTab === "여행노트" ? (
          <TripNote />
        ) : currentTab === "콕콕코스" ? (
          <div className="px-4 py-4">
            <h2 className="text-xl font-bold mb-2">📌 나의 콕콕코스</h2>
            {/* 콕콕코스 관련 콘텐츠를 여기에 추가 */}
            <p>내가 만든 여행 코스를 보여주는 공간입니다.</p>
          </div>
        ) : (
          <>
            <SearchBar selectedType={selectedType} />
            <ListBtn
              typeButton={selectedType}
              tourTypeId={(type1) => {
                setSelectedType(type1);
              }}
            />

            <div className="full px-4 pb-4">
              {selectedType == 12 ? (
                <ListViewComp
                  listdata={courseData.typeOneList}
                  checkLike={handleLike}
                  checkFavorite={handleFavorite}
                />
              ) : null}

              {selectedType == 39 ? (
                <ListViewComp
                  listdata={courseData.typeTwoList}
                  checkLike={handleLike}
                />
              ) : null}

              <div className="bg-red-400 h-3"></div>

              {visiblePlaces.map((place) => {
                const isAdded = courseList.some(
                  (item) => item.contentid === place.contentid
                );
                return (
                  <div>
                    <pre>{JSON.stringify(courseData, null, 2)}</pre>
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
      {isDetailOpen && <DetailPanel onClose={() => setIsDetailOpen(false)} />}
    </div>
  );
}

export default TripCreator;
