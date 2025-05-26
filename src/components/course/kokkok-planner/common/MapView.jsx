import React, { useState } from "react";
import { CustomOverlayMap, Map, MapMarker } from "react-kakao-maps-sdk";

function MapView({ places = [], addedCourses = [], onRemoveCourse, center }) {
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
                ? "/images/mapMaker.png" // 음식점 마커 위에 마우스 올라갔을 때
                : "/images/whisMaker2.png" // 음식점 코스에 추가된 상태
              : "/images/mapMaker.png"; // 기본 음식점 마커
          } else {
            // 음식점
            markerImg = isAdded
              ? isHovered
                ? "/images/mapMaker.png" // 여행지 마커 위에 마우스 올라갔을 때
                : "/images/whisMaker2.png" // 여행지 코스에 추가된 상태
              : "/images/mapMaker.png"; // 기본 여행지 마커
          }

          return (
            <React.Fragment key={place.contentid}>
              {/* 마커 */}
              <MapMarker
                position={{ lat, lng }}
                image={{
                  src: markerImg,
                  size: { width: 50, height: 50 },
                  options: { offset: { x: 30, y: 40 } },
                }}
                onMouseOver={() => isAdded && setHoveredId(place.contentid)}
                onMouseOut={() => setHoveredId(null)}
                onClick={() => {
                  if (isAdded && isHovered) {
                    onRemoveCourse(place.contentid);
                  } else {
                    setSelectedId(
                      selectedId === place.contentid ? null : place.contentid
                    );
                  }
                }}
              />

              {/* ✅ 마커 외부에서 타이틀 오버레이 출력 */}
              {isSelected && (
                <CustomOverlayMap position={{ lat, lng }} yAnchor={2.5}>
                  <div
                    style={{
                      padding: "4px 12px",
                      background: "#fff",
                      fontSize: "13px",
                      textAlign: "center",
                      whiteSpace: "nowrap",
                      borderRadius: "15px",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                      fontWeight: "bold",
                    }}
                  >
                    {place.title}
                  </div>
                </CustomOverlayMap>
              )}
            </React.Fragment>
          );
        })}
      </Map>
    </div>
  );
}

export default MapView;
