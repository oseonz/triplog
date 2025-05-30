import React, { useState } from "react";
import {
  Map,
  MapMarker,
  CustomOverlayMap,
  Polyline,
} from "react-kakao-maps-sdk";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { courseDataState } from "../../../../pages/course/atom/courseState";

function MapView(center, level, selectedType, addedCourses, onMarkerClick) {
  const { tourPlaces, foodPlaces } = useRecoilValue(courseDataState);

  //const [selectedId, setSelectedId] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);

  const places =
    selectedType === "12"
      ? tourPlaces
      : selectedType === "39"
      ? foodPlaces
      : addedCourses;

  return (
    <div className="w-full vheight">
      <Map
        center={center}
        level={level}
        style={{ width: "100%", height: "100%" }}
      >
        {places.map((place) => {
          const lat = Number(place.mapy);
          const lng = Number(place.mapx);
          if (isNaN(lat) || isNaN(lng)) return null;

          const isSelected = selectedId === place.contentid;
          const isAdded = addedCourses.some(
            (item) => item.contentid === place.contentid
          );
          const isHovered = hoveredId === place.contentid;
          const type = String(place.contenttypeid);

          let markerImg = "/images/mapMaker.png";
          if (type === "12") {
            markerImg = isAdded
              ? isHovered
                ? "/images/mapDeleteMaker.png"
                : "/images/mapWishMaker.png"
              : "/images/mapMaker.png";
          } else {
            markerImg = isAdded
              ? isHovered
                ? "/images/foodDeleteMaker.png"
                : "/images/foodWishMaker.png"
              : "/images/foodMaker.png";
          }

          return (
            <React.Fragment key={place.contentid}>
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
                  setSelectedId(place.contentid);
                  setSelectedPlace(place); // ✅ 디테일 패널용 상태 설정
                }}
              />
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
