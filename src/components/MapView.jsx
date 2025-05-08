import React, { useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

function MapView({ places = [], addedCourses = [], onRemoveCourse }) {
  const center = {
    lat: 37.566826,
    lng: 126.9786567,
  };

  // 클릭된 마커 ID 저장
  const [selectedId, setSelectedId] = useState(null);
  // 마우스가 올라간 마커의 ID를 저장
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <Map center={center} level={3} style={{ width: "100%", height: "100%" }}>
        {places.map((place, index) => {
          const lat = Number(place.mapy) + index * 0.00003;
          const lng = Number(place.mapx) + index * 0.00003;
          const isSelected = selectedId === place.contentid;

          const type = String(place.contenttypeid);
          let markerImg = "public/images/tourMaker.png";

          const isAdded = addedCourses.includes(place.contentid);
          const isHovered = hoveredId === place.contentid;
          if (type === "12") {
            // 여행지
            markerImg = isAdded
              ? isHovered
                ? "/images/deletMaker2.png" // 음식점 마커 위에 마우스 올라갔을 때
                : "/images/whisMaker2.png" // 음식점 코스에 추가된 상태
              : "/images/tourMaker.png"; // 기본 음식점 마커
          } else {
            // 음식점
            markerImg = isAdded
              ? isHovered
                ? "/images/deletMaker2.png" // 여행지 마커 위에 마우스 올라갔을 때
                : "/images/whisMaker2.png" // 여행지 코스에 추가된 상태
              : "/images/foodMaker2.png"; // 기본 여행지 마커
          }

          return (
            <MapMarker
              key={place.contentid}
              position={{ lat, lng }}
              image={{
                src: markerImg,
                size: { width: 60, height: 60 },
                options: { offset: { x: 30, y: 60 } },
              }}
              onMouseOver={() => isAdded && setHoveredId(place.contentid)}
              onMouseOut={() => setHoveredId(null)}
              onClick={() => {
                if (isAdded && isHovered) {
                  // 코스에서 제거
                  onRemoveCourse(place.contentid);
                } else {
                  // 일반 선택 처리
                  setSelectedId(
                    selectedId === place.contentid ? null : place.contentid
                  );
                }
              }}
            >
              {/* ✅ 클릭된 마커에만 장소명 말풍선 출력 */}
              {isSelected && (
                <div
                  style={{
                    padding: "5px 10px",
                    background: "#fff",
                    fontSize: "13px",
                    textAlign: "center",
                  }}
                >
                  {place.title}
                </div>
              )}
            </MapMarker>
          );
        })}
      </Map>
    </div>
  );
}

export default MapView;
