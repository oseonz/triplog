import React, { useEffect, useState } from 'react';
import {
    Map as KakaoMap,
    MapMarker,
    CustomOverlayMap,
} from 'react-kakao-maps-sdk';
import { useRecoilValue } from 'recoil';
import {
    courseDataState,
    courseListState,
} from '../../../../pages/course/atom/courseState';

function MapView({
    center,
    level,
    visiblePlaces = [],
    checkCourse = [],
    onMarkerClick,
    onSaveCourse,
}) {
    const [selectedId, setSelectedId] = useState(null);
    const [hoveredId, setHoveredId] = useState(null);
    const [map, setMap] = useState(null);
    const courseData = useRecoilValue(courseDataState);
    const courseList = useRecoilValue(courseListState);

    useEffect(() => {
        console.log('🔥 courseList:', courseList);
    }, [courseList]);
    // ✅ 선 그리기용
    useEffect(() => {
        if (!map || courseList.length < 2) return;

        const path = courseList
            .filter((p) => p.mapy && p.mapx)
            .map(
                (place) =>
                    new window.kakao.maps.LatLng(
                        Number(place.mapy),
                        Number(place.mapx),
                    ),
            );

        const line = new window.kakao.maps.Polyline({
            path,
            strokeWeight: 4,
            strokeColor: '#007bff',
            strokeOpacity: 0.9,
            strokeStyle: 'solid',
        });

        line.setMap(map);

        return () => line.setMap(null);
    }, [courseList, map]);

    // ✅ 코스 중심으로 이동
    useEffect(() => {
        if (!map || checkCourse.length === 0) return;

        const last = checkCourse[checkCourse.length - 1];
        const lat = Number(last.mapy);
        const lng = Number(last.mapx);

        if (!isNaN(lat) && !isNaN(lng)) {
            map.setCenter(new window.kakao.maps.LatLng(lat, lng));
        }
    }, [checkCourse, map]);

    // ✅ 마커 이미지 조건 분기

    return (
        <div className="w-full h-full">
            <KakaoMap
                center={center}
                level={level}
                onCreate={setMap}
                style={{ width: '100%', height: '100%' }}
            >
                {visiblePlaces.map((place) => {
                    const lat = Number(place.mapy);
                    const lng = Number(place.mapx);
                    if (isNaN(lat) || isNaN(lng)) return null;

                    const isSelected = selectedId === place.contentid;
                    const isHovered = hoveredId === place.contentid;
                    const type = String(place.contenttypeid);
                    const markerImg =
                        type === '39'
                            ? '/images/foodMaker.png'
                            : '/images/mapMaker.png';

                    return (
                        <React.Fragment key={place.contentid}>
                            <MapMarker
                                position={{ lat, lng }}
                                image={{
                                    src: markerImg,
                                    size: { width: 40, height: 40 },
                                    options: { offset: { x: 20, y: 40 } },
                                }}
                                onClick={() => {
                                    setSelectedId(place.contentid);
                                    onMarkerClick(place);
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
            <button
                onClick={onSaveCourse}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-3xl"
            >
                코스 저장하기
            </button>
        </div>
    );
}

export default MapView;
