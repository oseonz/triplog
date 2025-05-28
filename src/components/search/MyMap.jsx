import { Map, MapMarker } from "react-kakao-maps-sdk";

const MyMap = ({ mapx, mapy }) => {
  return (
    <div className="h-[300px] w-full">
      <Map
        center={{ lat: mapy, lng: mapx }}
        style={{ width: "100%", height: "100%" }}
        level={3}
      >
        <MapMarker position={{ lat: mapy, lng: mapx }}></MapMarker>
      </Map>
    </div>
  );
};

export default MyMap;
