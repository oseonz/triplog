import React from 'react';
import {
    courseListState,
    selectedPlaceState,
} from '../../../../../src/pages/course/atom/courseState';
import { useSetRecoilState, useRecoilValue } from 'recoil';

function ListViewComp({ place, checkLike, checkFavorite, type }) {
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
            <div className="flex items-center gap-3">
                <img
                    src={place.firstimage}
                    alt={place.title}
                    className="w-[90px] h-[90px] object-cover rounded-full"
                />
                <div>
                    <div>
                        <div className="flex justify-between  ">
                            <h2 className="text-lg font-bold">{place.title}</h2>

                            <img
                                src={
                                    place.favorite
                                        ? '/images/i_bookmarks2.png'
                                        : '/images/i_bookmarks.png'
                                }
                                alt="좋아요 하트"
                                onClick={(e) => {
                                    e.stopPropagation(); // 카드 클릭과 충돌 방지
                                    checkFavorite(place.contentid); // 좋아요 토글 함수 호출
                                }}
                                className="w-5 h-5 cursor-pointer"
                            />
                        </div>
                        <p className="truncate w-[250px]">{place.addr1}</p>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <img
                                    src={
                                        place.mylike
                                            ? '/images/i_heart2.png'
                                            : '/images/i_heart.png'
                                    }
                                    alt="좋아요 하트"
                                    onClick={(e) => {
                                        e.stopPropagation(); // 카드 클릭과 충돌 방지
                                        checkLike(place.contentid); // 좋아요 토글 함수 호출
                                    }}
                                    className="w-5 h-5 cursor-pointer"
                                />
                                <button
                                    onClick={() => checkLike(place.contentid)}
                                >
                                    {place.likes_count}
                                </button>
                            </div>
                            <input
                                type="checkbox"
                                checked={checkCourse}
                                onChange={(e) => {
                                    e.stopPropagation();
                                    setSelectedPlace(place); // ✅ 디테일 패널 열리도록 선택
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
            </div>
            <div></div>
        </div>
    );
}

export default ListViewComp;
