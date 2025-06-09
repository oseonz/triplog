import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import DetailLayout from '../../layouts/DetailLayout';
import {
    fetchDetailIntro,
    tourApiViewOne,
} from '../../api/search/newSearchApi';
import { getLikes } from '../../api/search/newSearchBackApi';
import BlueBtn from '../../components/common/BlueBtn';
import MapView from '../../components/course/kokkok-planner/common/MapView';
import MyMap from '../../components/search/MyMap';
import DetailInfo from '../../components/search/DetailInfo';
import DetailInfo2 from '../../components/search/DetailInfo2';
import EventDetail from '../../components/info/EventDetail';
import { checkFavorite, setFavorites, unsetFavorite } from '../../api/course/favoritesApi';
import { checkLikesContent, setLikesContent, unsetLikesContent } from '../../api/common/likesApi';
import { saveRemark } from '../../api/common/remarksApi';

// //지도 스크립트
// <script
//   type="text/javascript"
//   src="//dapi.kakao.com/v2/maps/sdk.js?appkey=d14b3407f2ab8aa29337555dccd89793&libraries=services,clusterer"
// ></script>;

function DetailPage() {

    const { contentid } = useParams();
    // const { contentid, contenttypeid } = useParams();
    const location = useLocation();
    const {
            user_id,
            contentId,
            contentTypeId,
            title,
            addr1,
            addr2,
            areaCode,
            sigunguCode,
            firstimage,
            mapX,
            mapY
  } = location.state || {}

    const [comment, setComment] = useState("");

    const [detail, setDetail] = useState(null);
    const [intro, setIntro] = useState(null);
    const [bookmarked, setBookmarked] = useState(false);
      const [liked, setLiked] = useState(false);
    // const [heart, setHeart] = useState(false);
    const [likesCount, setLikesCount] = useState(0);


    const handleSaveRemark = async (e) => {
        
        e.stopPropagation();
        e.preventDefault();

        let result;

        if (!comment || comment.trim() === "") {
            alert("댓글 내용을 작성해 주세요.");
            return;
        }
        try {
            result = await saveRemark(
                user_id,
                contentId,
                contentTypeId,
                title,
                addr1,
                addr2,
                areaCode,
                sigunguCode,
                firstimage,
                mapX,
                mapY,
                comment,
            );

            console.log('saveRemark : ', result);

        }
        catch(err){
                console.error("댓글 저장 실패:", err);
                alert("handleBookmarkClick : 댓글 저장 중 오류가 발생했습니다.");
        }

        

        // 저장한 댓글을 아래에 추가해야함. 전체 페이지 리로드?
    }
    const handleBookmarkClick = async (e) => {
        e.stopPropagation();
        e.preventDefault();

        let result;

        if (bookmarked) {
            result = await unsetFavorite(user_id, contentId);
            console.log('unsetFavorite : ', result);
        } else {
            result = await setFavorites(
                user_id,
                contentId,
                contentTypeId,
                title,
                addr1,
                addr2,
                areaCode,
                sigunguCode,
                firstimage,
                mapX,
                mapY,
            );
            console.log('setFavorites : ', result);
        }

        const ret = await checkFavorite(user_id, contentId);
        console.log('checkFavorite : ', result);
        setBookmarked(ret);
        // setBookmarked(!bookmarked); // 직접 DB상태를 확인하는 것으로 변경
    };

    const handleLikeClick = async (e) => {
        e.stopPropagation();
        e.preventDefault();

        let result;

        if (liked) {
            result = await unsetLikesContent(user_id, contentId);
            console.log('unsetLikesContent : ', result);
        } else {
            result = await setLikesContent(
                user_id,
                contentId,
                contentTypeId,
                title,
                addr1,
                addr2,
                areaCode,
                sigunguCode,
                firstimage,
                mapX,
                mapY,
            );
            console.log('setLikesContent : ', result);
        }

        const ret = await checkLikesContent(user_id, contentId);
        console.log('checkLikesContent : ', ret);

        setLikesCount(ret.likes_count);
        setLiked(ret.my_check);

        // setBookmarked(!bookmarked);
    };

    const checkLiked = async () => {
        const result = await checkLikesContent(user_id, contentId);
        if (result.my_check == true) setLiked(true);
        else setLiked(false);
        setLikesCount(result.likes_count);
    };

    const checkBookmark = async () => {
        console.log('######## user_id, contentId :', user_id, contentId);
        const result = await checkFavorite(user_id, contentId);
        if (result == true) setBookmarked(true);
        else setBookmarked(false);
    };

    useEffect(() => {
        checkBookmark();
        checkLiked();
    }, []);

    useEffect(() => {
        tourApiViewOne(contentId)
            .then(async (tourData) => {
                const { contenttypeid: ContentTypeId } = tourData;
                                    console.log("#### content Id : ", contentId);
                const [likesData, introData] = await Promise.all([

                    getLikes(contentId),
                    fetchDetailIntro(contentId, ContentTypeId),
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
    }, [contentId]);

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
                                    liked
                                        ? '/images/heart-f.png'
                                        : '/images/heart-o.png'
                                }
                                onClick={handleLikeClick}
                                alt="좋아요"
                                className="w-[36px]"
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
                        ) : detail?.contenttypeid == '15' ? (
                            <EventDetail intro={intro} detail={detail} />
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
                    <BlueBtn to="/course/builder" label="코스 만들러 가기" />
                </div>
                <div className="mb-12">
                    <div className="flex mb-2 justify-between">
                        <div>
                            <p className="text-2xl font-bold">로그 톡톡</p>
                        </div>
                        <div className="flex">
                            <div className="flex items-center gap-1">
                                <img
                                    src={
                                        liked
                                            ? '/images/heart-f.png'
                                            : '/images/heart-o.png'
                                    }
                                    onClick={handleLikeClick}
                                    alt="좋아요"
                                    className="w-[36px]"
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
                        </div>

                    </div>
                    <textarea
                        name="comment"
                        id="comment"
                        value={comment}
                        onChange={(e)=>{setComment(e.target.value)}}
                        placeholder="소중한 댓글을 남겨주세요."
                        className="w-[1200px] h-[100px] border border-gray-300 p-4 placeholder:text-start resize-none mb-4"
                    />
                    <div className="flex justify-end">
                        <button name='saveBtn' className="bg-blue-500 text-white py-2 px-6 border border-blue-500 hover:bg-blue-600" onClick={handleSaveRemark}> 
                            등록
                        </button>
                    </div>
                </div>
            </DetailLayout>
        </>
    );
}

export default DetailPage;
