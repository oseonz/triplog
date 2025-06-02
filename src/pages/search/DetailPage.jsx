import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DetailLayout from '../../layouts/DetailLayout';
import { fetchDetailIntro, tourApiViewOne } from '../../api/newSearchApi';
import { getLikes } from '../../api/newSearchBackApi';
import BlueBtn from '../../components/common/BlueBtn';
import MapView from '../../components/course/kokkok-planner/common/MapView';
import MyMap from '../../components/search/MyMap';
import DetailInfo from '../../components/search/DetailInfo';
import DetailInfo2 from '../../components/search/DetailInfo2';

// //지도 스크립트
// <script
//   type="text/javascript"
//   src="//dapi.kakao.com/v2/maps/sdk.js?appkey=d14b3407f2ab8aa29337555dccd89793&libraries=services,clusterer"
// ></script>;

function DetailPage() {
    const { contentid, contenttypeid } = useParams();
    const [detail, setDetail] = useState(null);
    const [intro, setIntro] = useState(null);
    const [bookmarked, setBookmarked] = useState(false);
    const [heart, setHeart] = useState(false);
    const [likesCount, setLikesCount] = useState(0);

    const handleBookmarkClick = (e) => {
        e.stopPropagation();
        e.preventDefault();
        setBookmarked(!bookmarked);
    };

    const handleHeartClick = (e) => {
        e.stopPropagation();
        e.preventDefault();

        setHeart((prev) => {
            const newHeart = !prev;
            setLikesCount((count) => (newHeart ? count + 1 : count - 1)); // ✅ 증감 처리
            return newHeart;
        });
    };

    // useEffect(() => {
    //   Promise.all([
    //     tourApiViewOne(contentid),
    //     getLikes({ contentid }),
    //     fetchDetailIntro(contentid, contenttypeid),
    //   ]).then(([tourData, likesData, introData]) => {
    //     setDetail({
    //       ...tourData,
    //       likes_count: likesData,
    //     });
    //     setLikesCount(likesData);
    //     setIntro(introData);
    //     console.log("detail 응답: ", tourData);
    //     console.log("like:", likesData);
    //     console.log("intro 응답: ", introData);
    //   });
    // }, []);

    useEffect(() => {
        tourApiViewOne(contentid)
            .then(async (tourData) => {
                const { contenttypeid: ContentTypeId } = tourData;
                const [likesData, introData] = await Promise.all([
                    getLikes({ contentid }),
                    fetchDetailIntro(contentid, ContentTypeId),
                ]);

                setDetail({
                    ...tourData,
                    likes_count: likesData,
                });
                setLikesCount(likesData);
                setIntro(introData);

                console.log('detail 응답: ', tourData);
                console.log('like:', likesData);
                console.log('intro 응답: ', introData);
            })
            .catch((err) => {
                console.error('데이터 로드 실패:', err);
            });
    }, [contentid]);

    if (!detail) return <div>데이터 불러오는 중...</div>;

    return (
        <>
            <DetailLayout>
                <div className="place-items-center gap-5">
                    <p className="text-4xl font-bold pb-5">{detail?.title}</p>
                    <p className="pb-5 text-gray-500">{detail?.addr1}</p>
                </div>
                <div className="pt-12 place-items-end pb-5">
                    <div className="flex gap-2">
                        <div className="flex items-center gap-1">
                            <img
                                src={
                                    heart
                                        ? '/images/i_heart2.png'
                                        : '/images/i_heart.png'
                                }
                                onClick={handleHeartClick}
                                alt="좋아요"
                            />
                            <p>{likesCount}</p>
                        </div>
                        <div className="flex items-center gap-1">
                            <img
                                src={
                                    bookmarked
                                        ? '/images/i_bookmarks2.png'
                                        : '/images/i_bookmarks.png'
                                }
                                onClick={handleBookmarkClick}
                                alt="북마크"
                            />
                        </div>
                        {/* <div className="flex items-center gap-1">
              <img src="/images/i_share.png" alt="" />
              <p>공유하기</p>
            </div> */}
                    </div>
                </div>
                <div className="relative h-[375px] overflow-hidden">
                    <img
                        src={detail?.firstimage || '/no_img.jpg'}
                        alt={detail?.title}
                        className="absolute top-[-10px] left-0 w-full h-full object-cover"
                    ></img>
                </div>
                <div className="mb-12">
                    <div className="mb-2">
                        <p className="text-2xl font-bold">상세 정보</p>
                    </div>
                    <div className="border border-black"></div>
                    <div className="p-5">
                        <p>{detail?.overview || '상세 설명이 없습니다.'}</p>
                    </div>
                </div>
                <div className="shadow-lg">
                    <div id="map" className="h-[300px] w-full">
                        <MyMap
                            places={[detail]}
                            center={{
                                lat: Number(detail.mapy),
                                lng: Number(detail.mapx),
                            }}
                        />
                    </div>
                    <div className="bg-white p-10 flex mb-12">
                        {detail?.contenttypeid == '12' ? (
                            <DetailInfo intro={intro} detail={detail} />
                        ) : (
                            <DetailInfo2 intro={intro} detail={detail} />
                        )}
                    </div>
                </div>
                <div className="mb-12">
                    <div className="mb-2">
                        <p className="text-2xl font-bold">추천 여행지</p>
                    </div>
                    <div className="border border-black"></div>
                    <div className="pt-5"></div>
                </div>
                <div className="flex justify-center items-center gap-5 mb-12">
                    <BlueBtn />
                </div>
                <div className="mb-12">
                    <div className="mb-2">
                        <p className="text-2xl font-bold">로그 톡톡</p>
                    </div>
                    <textarea
                        name="comment"
                        placeholder="소중한 댓글을 남겨주세요."
                        className="w-[1200px] h-[100px] border border-gray-300 p-4 placeholder:text-start resize-none mb-4"
                    />
                    <div className="flex justify-end">
                        <button className="bg-blue-500 text-white py-2 px-6 border border-blue-500 hover:bg-blue-600">
                            등록
                        </button>
                    </div>
                </div>
            </DetailLayout>
        </>
    );
}

export default DetailPage;
