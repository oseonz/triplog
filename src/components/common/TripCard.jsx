import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function TripCard({ firstimage, title, addr, likes_count, contentid }) {
  const [bookmarked, setBookmarked] = useState(false);
  const [heart, setHeart] = useState(false);
  const navigate = useNavigate();

  const handleBookmarkClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setBookmarked(!bookmarked);
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
          src={firstimage || "/no_img.jpg"}
          alt={title}
          className="w-[277px] h-[250px] object-cover"
        />
        <img
          src={
            bookmarked
              ? "../public/images/i_bookmarks2.png"
              : "../public/images/i_bookmarks.png"
          }
          className="absolute top-2 right-3 p-2 cursor-pointer transition"
          onClick={handleBookmarkClick}
          alt="bookmark icon"
        />
      </div>
      <div className="p-4 flex flex-col justify-between">
        <div>
          <p className="text-sm text-blue-500">{addr}</p>
          <h3 className="text-[18px] text-black">
            {title.length > 14 ? `${title.slice(0, 12)}⋯` : title}
          </h3>
          <div className="flex items-center">
            <img
              src={
                heart
                  ? "../public/images/i_heart2.png"
                  : "../public/images/i_heart.png"
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
