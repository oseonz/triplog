import React, { useState } from "react";
//공연/행사 카드

function EventCard({ image, title, location }) {
  const [bookmarked, setBookmarked] = useState(false);

  const handleBookmarkClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setBookmarked(!bookmarked);
  };

  return (
    <div className="bg-white rounded-[20px] shadow-lg overflow-hidden w-64 min-w-10 relative">
      <div className="relative">
        <img
          src={image}
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
          <p className="text-sm text-blue-500">{location}</p>
          <h3 className="text-[18px] text-black">{title}</h3>
          <div className="flex items-center">
            <img
              src="../public/images/i_heart.png"
              className="w-[23px]"
              alt="heart icon"
            />
            <span>1</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventCard;
