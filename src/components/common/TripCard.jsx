import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveFavorite } from '../../api/search/favorites';

function TripCard({ firstimage, title, addr1, likes_count, contentid }) {
    const [bookmarked, setBookmarked] = useState(false);
    const [heart, setHeart] = useState(false);
    const navigate = useNavigate();

    const handleBookmarkClick = async (e) => {
        e.stopPropagation();
        e.preventDefault();

        const payload = {
            user_id: 2,
            contentid: contentid,
            contenttypeid: '39',
            title: title,
            addr: addr1 || '주소 없음',
            areacode: '99',
            sigungucode: '99',
            firstimage: firstimage || '이미지가 없떠여',
        };

        try {
            console.log('보내는 payload:', payload);
            await saveFavorite(payload);
            setBookmarked(true);
            console.log('북마크 저장 완료');
        } catch (error) {
            console.error('북마크 저장 실패', error);
            alert('북마크 저장에 실패했습니다.');
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
