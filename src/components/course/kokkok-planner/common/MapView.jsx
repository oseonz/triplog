import React, { useEffect, useState } from 'react';
import {
    Map as KakaoMap,
    MapMarker,
    CustomOverlayMap,
} from 'react-kakao-maps-sdk';
import { useRecoilValue } from 'recoil';
import { courseDataState } from '../../../../pages/course/atom/courseState';

function MapView({ center, level, selectedType, onMarkerClick, checkCourse }) {
    const [selectedId, setSelectedId] = useState(null);
    const [hoveredId, setHoveredId] = useState(null);

    const courseData = useRecoilValue(courseDataState);
    const [map, setMap] = useState(null);

    const allPlaces = [
        ...(courseData.typeOneList || []),
        ...(courseData.typeTwoList || []),
        ...(checkCourse || []),
    ];

    const placeMap = new Map();
    allPlaces.forEach((place) => {
        placeMap.set(place.contentid, place); // 같은 contentid면 마지막 값 유지
    });
    const places = Array.from(placeMap.values());

    useEffect(() => {
        if (!map || !checkCourse || checkCourse.length < 2) return;

        const path = checkCourse
            .filter((p) => p.mapy && p.mapx)
            .map(
                (place) =>
                    new window.kakao.maps.LatLng(
                        Number(place.mapy),
                        Number(place.mapx),
                    ),
            );
        console.log('🧭 선 연결용 checkCourse:', checkCourse);
        const line = new window.kakao.maps.Polyline({
            path,
            strokeWeight: 4,
            strokeColor: '#007bff',
            strokeOpacity: 0.9,
            strokeStyle: 'solid',
        });

        line.setMap(map);

        return () => line.setMap(null);
    }, [checkCourse, map]);

    useEffect(() => {
        if (!map || !checkCourse || checkCourse.length === 0) return;

        const last = checkCourse[checkCourse.length - 1];
        const lat = Number(last.mapy);
        const lng = Number(last.mapx);

        if (!isNaN(lat) && !isNaN(lng)) {
            map.setCenter(new window.kakao.maps.LatLng(lat, lng));
        }
    }, [checkCourse, map]);

    return (
        <div className="w-full h-full">
            <KakaoMap
                center={center}
                level={level}
                style={{ width: '100%', height: '100%' }}
                onCreate={setMap}
            >
                {places.map((place) => {
                    const lat = Number(place.mapy);
                    const lng = Number(place.mapx);
                    if (isNaN(lat) || isNaN(lng)) return null;
                    console
                        .log
                        // '📍 마커용 좌표',
                        // place.title,
                        // place.mapx,
                        // place.mapy,
                        ();
                    const isSelected = selectedId === place.contentid;
                    const isHovered = hoveredId === place.contentid;

                    return (
                        <React.Fragment key={place.contentid}>
                            <MapMarker
                                position={{ lat, lng }}
                                image={{
                                    src: '/images/mapMaker.png',
                                    size: { width: 40, height: 40 },
                                    options: { offset: { x: 20, y: 40 } },
                                }}
                                onClick={() => {
                                    setSelectedId(place.contentid); // 클릭된 ID 기억
                                    onMarkerClick(place); // 외부에서 디테일 패널 열기
                                }}
                            />
                            {(isSelected || isHovered) && (
                                <CustomOverlayMap
                                    position={{ lat, lng }}
                                    yAnchor={2.5}
                                >
                                    <div
                                        style={{
                                            padding: '4px 12px',
                                            background: '#fff',
                                            fontSize: '13px',
                                            textAlign: 'center',
                                            whiteSpace: 'nowrap',
                                            borderRadius: '15px',
                                            boxShadow:
                                                '0 2px 6px rgba(0,0,0,0.2)',
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        {place.title}
                                    </div>
                                </CustomOverlayMap>
                            )}
                        </React.Fragment>
                    );
                })}
            </KakaoMap>
        </div>
    );
}

export default MapView;
