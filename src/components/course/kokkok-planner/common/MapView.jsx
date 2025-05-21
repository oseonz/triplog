import React, { useState } from "react";
import {
  Map,
  MapMarker,
  CustomOverlayMap,
  Polyline,
} from "react-kakao-maps-sdk";

function MapView({
  places = [],
  addedCourses = [],
  onRemoveCourse,
  center,
  level,
  onMarkerClick,
  selectedType,
}) {
  const [selectedId, setSelectedId] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <Map
        center={center || { lat: 37.566826, lng: 126.9786567 }} // ✅ 기본값 서울시청
        level={level || 5} // ✅ 기본 줌 레벨
        style={{ width: "100%", height: "100%" }}
      >
        {places.map((place, index) => {
          const lat = Number(place.mapy) + index * 0.00003;
          const lng = Number(place.mapx) + index * 0.00003;
          const isSelected = selectedId === place.contentid;

          const type = String(place.contenttypeid);
          const isAdded = addedCourses.some(
            (course) => course.contentid === place.contentid
          );
          const isHovered = hoveredId === place.contentid;

          // ✅ 마커 이미지 조건 분기
          let markerImg = "/images/mapMaker.png";
          if (type === "12") {
            // 여행지
            markerImg = isAdded
              ? isHovered
                ? "/images/mapDeleteMaker.png"
                : "/images/mapWishMaker.png"
              : "/images/mapMaker.png";
          } else {
            // 음식점
            markerImg = isAdded
              ? isHovered
                ? "/images/foodDeleteMaker.png"
                : "/images/foodWishMaker.png"
              : "/images/foodMaker.png";
          }

          return (
            <React.Fragment key={place.contentid}>
              {/* ✅ 마커 */}
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
                  setSelectedId(place.contentid);
                  onMarkerClick(place);
                }}
              />

              {/* ✅ 마커 오버레이 (타이틀) */}
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

        {/* ✅ 코스 선 연결 */}
        {selectedType === "course" && addedCourses.length >= 2 && (
          <Polyline
            path={addedCourses.map((place) => ({
              lat: Number(place.mapy),
              lng: Number(place.mapx),
            }))}
            strokeWeight={5}
            strokeColor={"#007AFF"}
            strokeOpacity={0.8}
            strokeStyle={"solid"}
          />
        )}
      </Map>
    </div>
  );
}

export default MapView;
