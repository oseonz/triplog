import { Map, MapMarker } from "react-kakao-maps-sdk";

function MapView({ places, selectedPlace, onSelectPlace }) {
  // 기본 중심 좌표 (서울시청)
  const defaultCenter = {
    lat: 37.566826,
    lng: 126.9786567,
  };

  // 선택된 장소가 있다면 중심 좌표를 그쪽으로 이동
  const center = selectedPlace
    ? { lat: selectedPlace.mapy, lng: selectedPlace.mapx }
    : defaultCenter;

  return (
    <Map center={center} level={6} className="w-full h-full">
      {places.map((place) => (
        <MapMarker
          key={place.contentid}
          position={{ lat: place.mapy, lng: place.mapx }}
          onClick={() => onSelectPlace(place)} // ✅ 마커 클릭하면 DetailPanel 뜨게
        />
      ))}
    </Map>
  );
}

export default MapView;
