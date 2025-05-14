import React, { useEffect, useState } from "react";
import { fetchTourPlaces } from "../../api/course";
import { fetchDetailIntro } from "../../api/course"; // 상세정보 API 추가
import MapView from "../../components/MapView";
import TabMenu from "../../components/TabMenu";
import ListBtn from "../../components/ListBtn";
import SearchBar from "../../components/SearchBar";
import DetailPanel from "../../components/DetailPanel";
import HeaderBar from "../../components/HeaderBar";

function CourseBuilder() {
  const [allPlaces, setAllPlaces] = useState([]);
  const [type, setType] = useState("12");
  const [visibleCount, setVisibleCount] = useState(6);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [comment, setComment] = useState("");
  const [currentTab, setCurrentTab] = useState("여행만들기");
  const [keyword, setKeyword] = useState("");
  const [addedCourses, setAddedCourses] = useState([]);
  const [mapCenter, setMapCenter] = useState({
    lat: 37.566826,
    lng: 126.9786567,
  });

  // 일정 + 제목 입력용 상태
  const [tripTitle, setTripTitle] = useState("");
  const [duration, setDuration] = useState("당일여행");

  const visiblePlaces = allPlaces.slice(0, visibleCount);

  useEffect(() => {
    loadPlaces();
  }, [type]);

  const loadPlaces = async () => {
    const data = await fetchTourPlaces(type, 20, keyword);
    setAllPlaces(data);
    setVisibleCount(6);
    setSelectedPlace(null);

    // ✅ 검색 결과의 첫 번째 장소로 중심 이동
    if (data.length > 0) {
      const first = data[0];
      setMapCenter({
        lat: Number(first.mapy),
        lng: Number(first.mapx),
      });
    }
  };

  const handleSearch = async () => {
    try {
      const data = await fetchTourPlaces(type, 20, keyword); // keyword 포함된 검색
      setAllPlaces(data);
      setVisibleCount(6); // 결과가 많을 경우를 위해 초기 6개만 보여줌
      setSelectedPlace(null); // 기존 선택 초기화

      // ✅ 지도 중심 변경
      if (data.length > 0) {
        const first = data[0];
        setMapCenter({
          lat: Number(first.mapy),
          lng: Number(first.mapx),
        });
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

  const handleLoadMore = () => setVisibleCount((prev) => prev + 6);

  const handleAddCourse = () => {
    if (!selectedPlace) return;
    const alreadyAdded = addedCourses.includes(selectedPlace.contentid);

    if (!alreadyAdded) {
      setAddedCourses((prev) => [...prev, selectedPlace.contentid]);
      alert(`📌 [${selectedPlace.title}]가 코스에 추가되었습니다!`);
    } else {
      alert("이미 추가된 장소입니다!");
    }
  };

  const handleRemoveCourse = (id) => {
    setAddedCourses((prev) => prev.filter((cid) => cid !== id));
  };

  const handleCommentSubmit = () => {
    if (comment.trim() !== "") {
      alert(`📝 댓글 작성됨: ${comment}`);
      setComment("");
    }
  };

  return (
    <div className="flex w-full h-screen  ">
      {/* 왼쪽 사이드 영역 */}
      <div className="w-[450px] bg-white flex flex-col relative z-10">
        <HeaderBar
          onBack={() => console.log("이전 페이지로 이동")} // 또는 useNavigate(-1)
          onShare={() => alert("🔗 공유 기능은 추후 구현됩니다!")}
        />

        {/* 1. 상단 탭 */}
        <TabMenu currentTab={currentTab} setCurrentTab={setCurrentTab} />

        {/* 2. 일정 선택 + 코스 제목 */}
        <div className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="">일정</span>
            <div className="flex gap-2  ">
              {["당일여행", "1박2일", "2박3일"].map((label) => (
                <button
                  key={label}
                  className={`px-3 py-1 rounded text-white ${
                    duration === label ? "bg-blue-500" : "bg-gray-600"
                  }`}
                  onClick={() => setDuration(label)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div className="flex align-center gap-2">
            <input
              type="text"
              className="w-full border p-2 rounded mb-2"
              placeholder="코스 제목을 입력하세요"
              value={tripTitle}
              onChange={(e) => setTripTitle(e.target.value)}
            />
          </div>
        </div>

        {/* 3. 검색바 */}
        <SearchBar
          keyword={keyword}
          setKeyword={setKeyword}
          onSearch={handleSearch}
        />

        {/* 4. 여행지/음식점 버튼 */}
        <ListBtn selectedType={type} setType={setType} />

        {/* 5. 장소 리스트 */}
        <div className="flex-1 overflow-y-auto px-4 pb-4">
          {visiblePlaces.map((place) => (
            <div
              key={place.contentid}
              onClick={() => handlePlaceClick(place)}
              className="bg-white p-4 mb-4 rounded-lg shadow-md cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <img
                  src={place.firstimage || "/no_img.jpg"}
                  alt={place.title}
                  className="w-24 h-24 object-cover rounded-full"
                />
                <div className="min-w-0">
                  <p className="font-medium text-xl truncate">{place.title}</p>
                  <p className="text-sm text-gray-600 truncate">
                    {place.addr1}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* 더보기 */}
          {visibleCount < allPlaces.length && (
            <button
              onClick={handleLoadMore}
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              더보기 +
            </button>
          )}
        </div>
      </div>

      {/* 오른쪽 지도 */}
      <div className="flex-1 p-4 bg-white">
        <MapView
          places={visiblePlaces}
          center={mapCenter}
          addedCourses={addedCourses}
          onRemoveCourse={handleRemoveCourse}
        />
      </div>

      {/* 오른쪽 상세 정보 패널 */}
      <DetailPanel
        selectedPlace={selectedPlace}
        onClose={() => setSelectedPlace(null)}
        onAddCourse={handleAddCourse}
        comment={comment}
        setComment={setComment}
        onCommentSubmit={handleCommentSubmit}
      />
    </div>
  );
}

export default CourseBuilder;
