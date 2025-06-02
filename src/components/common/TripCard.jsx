import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveBookmark } from '../../api/search/bookmark';

function TripCard({
    firstimage,
    title,
    addr1,
    likes_count,
    contentid,
    isBookmarked,
}) {
    const [bookmarked, setBookmarked] = useState(isBookmarked);
    const [heart, setHeart] = useState(false);
    const navigate = useNavigate();

    const handleBookmarkClick = async (e) => {
        e.stopPropagation();
        e.preventDefault();

        try {
            await saveBookmark({
                user_id: 1,
                contentid,
                contenttypeid: 12,
                title,
                addr: addr1,
                areacode: 99,
                sigungucode: 99,
                firstimage: firstimage || '이미지가 없떠여',
            });

            setBookmarked(!bookmarked);
        } catch (err) {
            alert('북마크 저장 실패!');
        }
    };

    const handleHeartClick = (e) => {
        e.stopPropagation();
        e.preventDefault();
        setHeart(!heart);
    };

    const handleCardClick = () => {
        navigate(`../detail/${contentid}`);
    };

    return (
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
                            ? '../public/images/i_bookmarks2.png'
                            : '../public/images/i_bookmarks.png'
                    }
                    className="absolute top-2 right-3 p-2 cursor-pointer transition"
                    onClick={handleBookmarkClick}
                    alt="bookmark icon"
                />
            </div>
            <div className="p-4 flex flex-col justify-between">
                <div>
                    <p className="text-sm text-blue-500">{addr1}</p>
                    <h3 className="text-[18px] text-black">
                        {title.length > 14 ? `${title.slice(0, 12)}⋯` : title}
                    </h3>
                    <div className="flex items-center">
                        <img
                            src={
                                heart
                                    ? '../public/images/i_heart2.png'
                                    : '../public/images/i_heart.png'
                            }
                            className="w-[23px]"
                            onClick={handleHeartClick}
                            alt="heart icon"
                        />
                        <span>{likes_count}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TripCard;
