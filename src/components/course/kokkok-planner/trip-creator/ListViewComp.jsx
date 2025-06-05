import React from 'react';
import {
    courseListState,
    selectedPlaceState,
} from '../../../../../src/pages/course/atom/courseState';
import { useSetRecoilState, useRecoilValue } from 'recoil';

function ListViewComp({ place, checkLike, checkFavorite, cardType }) {
    const setSelectedPlace = useSetRecoilState(selectedPlaceState);
    const courseList = useRecoilValue(courseListState);
    const setCourseList = useSetRecoilState(courseListState);

    const checkCourse = courseList.some(
        (item) => item.contentid === place.contentid,
    );
    return (
        <div
            className="border p-4 rounded shadow mb-4"
            onClick={() => {
                setSelectedPlace(place);
            }}
        >
            {cardType === 'one' ? (
                // ✅ 타입 원: 썸네일 왼쪽 + 텍스트 오른쪽
                <div className="flex items-center gap-3">
                    <img
                        src={place.firstimage || '/images/no-image.png'}
                        alt={place.title}
                        className="w-[90px] h-[90px] object-cover rounded-full"
                    />
                    <div>
                        <div className="flex justify-between items-center">
                            <h2 className="text-lg font-bold">{place.title}</h2>
                            <img
                                src={
                                    place.favorite
                                        ? '/images/i_bookmarks2.png'
                                        : '/images/i_bookmarks.png'
                                }
                                alt="찜 아이콘"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    checkFavorite(place.contentid);
                                }}
                                className="w-5 h-5 cursor-pointer"
                            />
                        </div>
                        <p className="truncate w-[250px]">{place.addr1}</p>
                        <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center">
                                <img
                                    src={
                                        place.mylike
                                            ? '/images/i_heart2.png'
                                            : '/images/i_heart.png'
                                    }
                                    alt="좋아요"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        checkLike(place.contentid);
                                    }}
                                    className="w-5 h-5 cursor-pointer"
                                />
                                <button
                                    onClick={() => checkLike(place.contentid)}
                                    className="ml-1 text-sm"
                                >
                                    {place.likes_count}
                                </button>
                            </div>
                            <input
                                type="checkbox"
                                checked={checkCourse}
                                onChange={(e) => {
                                    e.stopPropagation();
                                    setSelectedPlace(place);
                                    if (checkCourse) {
                                        setCourseList((prev) =>
                                            prev.filter(
                                                (p) =>
                                                    p.contentid !==
                                                    place.contentid,
                                            ),
                                        );
                                    } else {
                                        setCourseList((prev) => [
                                            ...prev,
                                            place,
                                        ]);
                                    }
                                }}
                            />
                        </div>
                    </div>
                </div>
            ) : (
                // ✅ 타입 투: 이미지 위 + 텍스트 아래
                <div
                    className=" bg-white transition relative cursor-pointer"
                    onClick={() => setSelectedPlace(place)}
                >
                    <img
                        src={place.firstimage || '/images/no-image.png'}
                        alt={place.title}
                        className="w-full h-24 object-cover rounded mb-2"
                    />

                    <div className="flex justify-between items-center">
                        <div className="font-semibold">{place.title}</div>
                        {/* <img
                            src={
                                place.favorite
                                    ? '/images/i_bookmarks2.png'
                                    : '/images/i_bookmarks.png'
                            }
                            alt="찜 아이콘"
                            onClick={(e) => {
                                e.stopPropagation();
                            }}
                            className="w-5 h-5 cursor-pointer"
                        /> */}
                    </div>

                    <div className="text-sm  truncate">{place.addr1}</div>

                    <div className=" flex justify-between items-center">
                        <div className="flex items-center gap-1">
                            <img
                                src={
                                    place.mylike
                                        ? '/images/i_heart2.png'
                                        : '/images/i_heart.png'
                                }
                                alt="좋아요"
                                className="w-5 h-5 cursor-pointer"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    checkLike(place.contentid);
                                }}
                            />
                            <button
                                onClick={() => checkLike(place.contentid)}
                                className="ml-1 text-sm"
                            >
                                {place.likes_count}
                            </button>
                        </div>
                        <input
                            type="checkbox"
                            className="w-5 h-5 accent-blue-500"
                            checked={checkCourse}
                            onChange={(e) => {
                                e.stopPropagation();
                                setSelectedPlace(place);
                                if (checkCourse) {
                                    setCourseList((prev) =>
                                        prev.filter(
                                            (p) =>
                                                p.contentid !== place.contentid,
                                        ),
                                    );
                                } else {
                                    setCourseList((prev) => [...prev, place]);
                                }
                            }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default ListViewComp;
