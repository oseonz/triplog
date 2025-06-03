import { useSetRecoilState, useRecoilState, useRecoilValue } from 'recoil';
import { selectedPlaceState } from '../../../../pages/course/atom/courseState';
import { courseListState } from '../../../../pages/course/atom/courseState';
import { courseDataState } from '../../../../pages/course/atom/courseState';

export default function CourseCardList({ checkLike, place }) {
    const courseList = useRecoilValue(courseListState);
    const [allData, setCourseData] = useRecoilState(courseDataState);
    const setSelectedPlace = useSetRecoilState(selectedPlaceState);

    if (courseList.length === 0) {
        return (
            <div className="text-gray-500 text-center py-8">
                아직 코스에 추가한 장소가 없습니다.
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4 h-[550px] overflow-y-auto px-2">
            {courseList.map((place) => {
                const checkCourse = courseList.some(
                    (p) => p.contentid === place.contentid,
                );

                return (
                    <div
                        key={place.contentid}
                        className="border rounded-lg shadow p-3 bg-white hover:shadow-lg transition relative cursor-pointer"
                        onClick={() => setSelectedPlace(place)} // 📌 디테일 패널 열기
                    >
                        <img
                            src={place.firstimage || '/images/no-image.png'}
                            alt={place.title}
                            className="w-full h-32 object-cover rounded mb-2"
                        />

                        <div className="font-semibold">{place.title}</div>
                        <div className="text-sm text-gray-500">
                            {place.addr1}
                        </div>

                        {/* 하단 기능 버튼 */}
                        <div className="mt-2 flex justify-between items-center">
                            {/* <img
                                src={
                                    place.favorite
                                        ? '/images/i_bookmarks2.png'
                                        : '/images/i_bookmarks.png'
                                }
                                alt="찜"
                                className="w-5 h-5 cursor-pointer"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    // TODO: 찜 toggle 함수 실행
                                }}
                            /> */}
                            {/* 좋아요 */}
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
                                <span className="text-sm">
                                    {place.likes_count}
                                </span>
                                {place.contentid}
                            </div>
                            {/* 체크박스 */}
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
                );
            })}
        </div>
    );
}
