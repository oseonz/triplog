import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// import {
//     checkLikesContent,
//     setLikesContent,
//     unsetLikesContent,
//     checkFavorite,
//     setFavorites,
//     unsetFavorite,
// } from '../../api/course/favoritesApi';

function EventCard({
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
    const [liked, setLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user_id || !contentId) return;

        const fetchData = async () => {
            try {
                const likeResult = await checkLikesContent(user_id, contentId);
                setLiked(likeResult.my_check);
                setLikesCount(likeResult.likes_count);

                const bookmarkResult = await checkFavorite(user_id, contentId);
                setBookmarked(bookmarkResult);
            } catch (error) {
                console.error('초기 데이터 로딩 오류:', error);
            }
        };

        fetchData();
    }, [user_id, contentId]);

    const handleLikeClick = async (e) => {
        e.stopPropagation();
        e.preventDefault();

        try {
            if (liked) {
                await unsetLikesContent(user_id, contentId);
            } else {
                await setLikesContent(
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
            }

            const result = await checkLikesContent(user_id, contentId);
            setLiked(result.my_check);
            setLikesCount(result.likes_count);
        } catch (err) {
            console.error('좋아요 처리 중 오류:', err);
        }
    };

    const handleBookmarkClick = async (e) => {
        e.stopPropagation();
        e.preventDefault();

        try {
            if (bookmarked) {
                await unsetFavorite(user_id, contentId);
            } else {
                await setFavorites(
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
            }

            const result = await checkFavorite(user_id, contentId);
            setBookmarked(result);
        } catch (err) {
            console.error('북마크 처리 중 오류:', err);
        }
    };

    const handleCardClick = () => {
        navigate(`../detail/${contentId}`);
    };

    return (
        <div className="bg-white rounded-[20px] shadow-lg overflow-hidden w-64 min-w-10 relative">
            <div onClick={handleCardClick}>
                <div className="relative">
                    <img
                        src={firstimage}
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
            </div>
            <div className="p-4 flex flex-col justify-between">
                <div>
                    <p className="text-sm text-blue-500">{addr1}</p>
                    <h3 className="text-[18px] text-black">{title}</h3>
                    <div className="flex items-center gap-2">
                        <img
                            src={
                                liked
                                    ? '/images/heart-f.png'
                                    : '/images/heart-o.png'
                            }
                            className="w-[23px] cursor-pointer"
                            onClick={handleLikeClick}
                            alt="heart icon"
                        />
                        <span>{likesCount}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EventCard;
