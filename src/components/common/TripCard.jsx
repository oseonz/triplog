import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    checkFavorite,
    setFavorites,
    unsetFavorite,
} from '../../api/course/favoritesApi';
import {
    checkLikesContent,
    setLikesContent,
    unsetLikesContent,
} from '../../api/common/LikesApi';

function TripCard({
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
}) {
    const [bookmarked, setBookmarked] = useState(false);
    const [heart, setHeart] = useState(false);
    const [likesCount, setLikesCount] = useState(0);
    const [liked, setLiked] = useState(false);
    const navigate = useNavigate();

    const extractSiGu = (addr1) => {
        if (!addr1) return '주소없음';
        const regex = /^([가-힣]+(특별시|광역시|도)?\s[가-힣]+(구|군|시|읍))/;
        const match = addr1.match(regex);
        return match ? match[1] : '시/구 없음';
    };

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
        const result = await checkFavorite(user_id, contentId);
        if (result == true) setBookmarked(true);
        else setBookmarked(false);
    };

    useEffect(() => {
        checkBookmark();
        checkLiked();
    }, []);

    const handleCardClick = () => {
        navigate(`../detail/${contentId}`);
    };

    return (
        <Link to={`../detail/${contentId}`}>
            <div
                onClick={handleCardClick}
                className="bg-white rounded-[20px] shadow-lg overflow-hidden w-64 min-w-10 relative"
            >
                <div className="relative">
                    <img
                        src={firstimage}
                        onError={(e) => {
                            e.target.src = '../public/images/no_img.jpg';
                        }}
                        alt={title}
                        className="w-[277px] h-[250px] object-cover"
                    />
                    <img
                        src={
                            bookmarked
                                ? '/images/i_bookmarks2.png'
                                : '/images/i_bookmarks.png'
                        }
                        className="absolute top-2 right-3 p-2 cursor-pointer transition"
                        onClick={handleBookmarkClick}
                        alt="bookmark icon"
                    />
                </div>
                <div className="p-4 flex flex-col justify-between">
                    <div>
                        <p className="text-sm text-blue-500">
                            {extractSiGu(addr1)}
                        </p>
                        <h3 className="text-[18px] text-black">
                            {title.length > 14
                                ? `${title.slice(0, 12)}⋯`
                                : title}
                        </h3>
                        <div className="flex items-center">
                            <img
                                src={
                                    liked
                                        ? '/images/heart-f.png'
                                        : '/images/heart-o.png'
                                }
                                className="w-[23px]"
                                onClick={handleLikeClick}
                                alt="heart icon"
                            />
                            <span>{likesCount}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default TripCard;
