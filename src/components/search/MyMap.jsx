import React, { useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

function MyMap({
    places = [],
    addedCourses = [],
    onRemoveCourse,
    center,
    level,
    onMarkerClick,
}) {
    const [selectedId, setSelectedId] = useState(null);
    const [hoveredId, setHoveredId] = useState(null);

    const defaultLat = places[0] ? Number(places[0].mapy) : 37.566826;
    const defaultLng = places[0] ? Number(places[0].mapx) : 126.9786567;
    const mapCenter = center || { lat: defaultLat, lng: defaultLng };

    return (
        <div className="h-[300px]">
            <Map
                center={mapCenter}
                level={level || 3}
                style={{ width: '100%', height: '100%' }}
                draggable={false}
                zoomable={false}
                disableDoubleClickZoom={true}
                scrollwheel={false}
            >
                {places.map((detail) => {
                    const lat = Number(detail.mapy);
                    const lng = Number(detail.mapx);
                    if (isNaN(lat) || isNaN(lng)) return null;

                    const isSelected = selectedId === detail.contentid;
                    const isAdded = checkCourse.some(
                        (course) => course.contentid === detail.contentid,
                    );
                    const isHovered = hoveredId === detail.contentid;

                    return (
                        <React.Fragment key={detail.contentid}>
                            <MapMarker
                                position={{ lat, lng }}
                                onMouseOver={() =>
                                    isAdded && setHoveredId(detail.contentid)
                                }
                                onMouseOut={() => setHoveredId(null)}
                                onClick={() => {
                                    if (isAdded && isHovered) {
                                        onRemoveCourse(detail.contentid);
                                    } else {
                                        setSelectedId(
                                            selectedId === detail.contentid
                                                ? null
                                                : detail.contentid,
                                        );
                                    }
                                    onMarkerClick(detail);
                                }}
                            />
                        </React.Fragment>
                    );
                })}
            </Map>
        </div>
    );
}

export default MyMap;
