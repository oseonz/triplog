import React, { useState } from 'react';
import { Map, MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk';
import { useRecoilValue } from 'recoil';
import { courseDataState } from '../../../../pages/course/atom/courseState';

function MapView({ center, level, selectedType, onMarkerClick }) {
    const [selectedId, setSelectedId] = useState(null);
    const [hoveredId, setHoveredId] = useState(null);

    const courseData = useRecoilValue(courseDataState);
    const places =
        selectedType === '12'
            ? courseData.typeOneList || []
            : courseData.typeTwoList || [];

    return (
        <div className="w-full h-full">
            <Map
                center={center}
                level={level}
                style={{ width: '100%', height: '100%' }}
            >
                {places.map((place) => {
                    const lat = Number(place.mapy);
                    const lng = Number(place.mapx);
                    if (isNaN(lat) || isNaN(lng)) return null;
                    console.log(
                        '📍 마커용 좌표',
                        place.title,
                        place.mapx,
                        place.mapy,
                    );
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
            </Map>
        </div>
    );
}

export default MapView;
