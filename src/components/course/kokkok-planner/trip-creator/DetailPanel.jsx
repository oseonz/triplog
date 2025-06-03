import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
    fetchDetailIntro,
    fetchDetailImages,
} from '../../../../api/course/tourSearchApi';
import {
    courseListState,
    selectedPlaceState,
} from '../../../../pages/course/atom/courseState';

function DetailPanel() {
    const [selectedPlace, setSelectedPlace] =
        useRecoilState(selectedPlaceState);
    const [detailInfo, setDetailInfo] = useState({});
    const [images, setImages] = useState([]);
    const [comment, setComment] = useState('');
    const courseList = useRecoilValue(courseListState);
    const setCourseList = useSetRecoilState(courseListState);
    const courseAdd = courseList.some(
        (item) => item.contentid === selectedPlace?.contentid,
    );

    useEffect(() => {
        async function loadDetail() {
            if (!selectedPlace?.contentid) return;

            const intro = await fetchDetailIntro(
                selectedPlace.contentid,
                selectedPlace.contenttypeid,
            );
            const imgs = await fetchDetailImages(selectedPlace.contentid);

            setDetailInfo(Array.isArray(intro) ? intro[0] : {});
            setImages(Array.isArray(imgs) ? imgs : []);
        }

        loadDetail();
    }, [selectedPlace]);

    useEffect(() => {
        if (!selectedPlace?.contentid || !selectedPlace?.contenttypeid) return;

        const loadDetail = async () => {
            try {
                const intro = await fetchDetailIntro(
                    selectedPlace.contentid,
                    selectedPlace.contenttypeid,
                );
                const imgs = await fetchDetailImages(selectedPlace.contentid);

                setDetailInfo(intro ?? {}); // null 체크
                setImages(Array.isArray(imgs) ? imgs : []);
            } catch (e) {
                console.error('❌ 상세정보 로딩 실패', e);
            }
        };

        loadDetail();
    }, [selectedPlace]);

    if (!selectedPlace) return null;

    const isFood = String(selectedPlace.contenttypeid) === '39';

    const handleCourseClick = () => {
        if (!selectedPlace) return;

        if (courseAdd) {
            setCourseList((prev) =>
                prev.filter(
                    (item) => item.contentid !== selectedPlace.contentid,
                ),
            );
        } else {
            setCourseList((prev) => [...prev, selectedPlace]);
        }
    };

    const handleCommentSubmit = () => {
        if (!comment.trim()) return alert('댓글을 입력하세요.');
        console.log('댓글 등록:', comment);
        setComment('');
    };

    return (
        <div className="absolute top-[95px] left-[435px] w-[400px] h-[90%] bg-white shadow-lg z-50 overflow-y-auto">
            <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-lg font-semibold">
                    {isFood ? '음식점' : '여행지'}
                </h2>
                <button onClick={() => setSelectedPlace(null)}>✕</button>
            </div>

            <div className="p-4">
                {selectedPlace.firstimage && (
                    <img
                        src={selectedPlace.firstimage}
                        alt="대표 이미지"
                        className="w-full h-48 object-cover rounded mb-3"
                    />
                )}
                <p className="text-lg font-bold">{selectedPlace.title}</p>
                <p className="text-base">📍 {selectedPlace.addr1}</p>

                {isFood ? (
                    <>
                        <p>
                            🕒 운영시간:{' '}
                            {detailInfo?.opentimefood || '정보 없음'}
                        </p>
                        <p>
                            🍽 대표 메뉴: {detailInfo?.treatmenu || '정보 없음'}
                        </p>
                        <p>
                            ❌ 휴무일: {detailInfo?.restdatefood || '정보 없음'}
                        </p>
                        <p>🚗 주차: {detailInfo?.parkingfood || '정보 없음'}</p>
                    </>
                ) : (
                    <>
                        <p>📞 안내: {detailInfo?.infocenter || '정보 없음'}</p>
                        <p>🕒 이용시간: {detailInfo?.usetime || '정보 없음'}</p>
                        <p>❌ 휴무일: {detailInfo?.restdate || '정보 없음'}</p>
                        <p>🚗 주차: {detailInfo?.parking || '정보 없음'}</p>
                    </>
                )}

                {images.length > 0 && (
                    <div className="grid grid-cols-2 gap-2 mt-4">
                        {images.map((img, idx) => (
                            <img
                                key={idx}
                                src={img.smallimageurl || img.originimgurl}
                                alt={`서브이미지 ${idx + 1}`}
                                className="rounded-lg object-cover w-40 h-28"
                            />
                        ))}
                    </div>
                )}

                <button
                    onClick={handleCourseClick}
                    className={`mt-3 w-full py-2 rounded text-white ${
                        courseAdd ? 'bg-gray-400' : 'bg-blue-500'
                    }`}
                >
                    {courseAdd ? '✔ 코스 취소하기' : '➕ 코스에 추가'}
                </button>

                <div className="mt-5">
                    <p className="text-sm font-semibold">💬 트립톡톡</p>
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="w-full border rounded p-2 mt-1 h-24 resize-none"
                        placeholder="댓글을 입력하세요"
                    />
                    <button
                        onClick={handleCommentSubmit}
                        className="mt-2 w-full bg-blue-500 text-white py-2 rounded"
                    >
                        댓글 등록
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DetailPanel;
