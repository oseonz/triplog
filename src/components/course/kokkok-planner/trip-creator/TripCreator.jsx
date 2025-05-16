import React, { useState } from "react";
import HeaderBar from "../common/HeaderBar";
import SearchBar from "./SearchBar";
import ListBtn from "./ListBtn";
import MapView from "../common/MapView";
import DetailPanel from "./DetailPanel";
import { fetchTourPlaces } from "../../../../api/course"; // 검색 API

function TripCreator() {
  const [keyword, setKeyword] = useState("");
  const [places, setPlaces] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [selectedType, setType] = useState("12"); // 12: 관광지, 39: 음식점
  const [comment, setComment] = useState("");
  const [courseList, setCourseList] = useState([]);

  const handleAddToCourse = () => {
    if (!selectedPlace) return;

    const exists = courseList.some(
      (item) => item.contentid === selectedPlace.contentid
    );

    if (exists) {
      alert("이미 추가된 장소입니다!");
      return;
    }

    setCourseList([...courseList, selectedPlace]);
    alert("✅ 코스에 추가되었습니다!");
  };

  // 🔍 검색 실행 함수
  const handleSearch = async () => {
    if (!keyword.trim()) {
      alert("검색어를 입력해주세요!");
      return;
    }

    const results = await fetchTourPlaces(selectedType, 10, keyword);
    setPlaces(results);
    setSelectedPlace(null); // 기존 상세 패널 닫기
  };

  return (
    <div className="flex w-full h-screen">
      {/* 왼쪽 사이드 영역 */}
      <div className="w-[450px] bg-white flex flex-col relative z-10">
        <HeaderBar
          onBack={() => console.log("뒤로가기")}
          onShare={() => console.log("공유")}
        />
        <SearchBar
          keyword={keyword}
          setKeyword={setKeyword}
          onSearch={handleSearch}
        />
        <ListBtn selectedType={selectedType} setType={setType} />
        {/* 장소 리스트 */}
        <div className="overflow-y-auto px-4 pb-4">
          {places.map((place) => (
            <div
              key={place.contentid}
              className="p-3 border rounded mb-2 cursor-pointer hover:bg-gray-100"
              onClick={() => setSelectedPlace(place)}
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
        </div>
      </div>

      {/* 오른쪽 지도 + 패널 */}
      <MapView
        places={places}
        center={
          selectedPlace
            ? {
                lat: Number(selectedPlace.mapy),
                lng: Number(selectedPlace.mapx),
              }
            : { lat: 37.566826, lng: 126.9786567 }
        }
        onRemoveCourse={() => {}} // 사용하지 않을 경우 빈 함수 전달
      />

      <DetailPanel
        selectedPlace={selectedPlace}
        onClose={() => setSelectedPlace(null)}
        onAddCourse={handleAddToCourse} // ✅ 여기에 연결
        comment={comment}
        setComment={setComment}
        onCommentSubmit={() => console.log("댓글 등록")}
      />
    </div>
  );
}

export default TripCreator;
