import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { checkFavorite, setFavorites, unsetFavorite } from "../../api/course/favoritesApi";
import { checkLikesContent, setLikesContent, unsetLikesContent } from "../../api/common/LikesApi";


//공연/행사 카드

function EventCard({ user_id, contentId, contentTypeId, title, addr1, addr2, areaCode, sigunguCode, firstimage, mapX, mapY }) {
  const [bookmarked, setBookmarked] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const navigate = useNavigate()

  const checkLiked = async () => {        
        const result = await checkLikesContent(user_id, contentId); 
        if(result.my_check == true) setLiked(true);
        else setLiked(false);
        setLikesCount(result.likes_count)
  } 

  const checkBookmark = async () => {        
        const result = await checkFavorite(user_id, contentId); 
        if(result == true) setBookmarked(true);
        else setBookmarked(false);
  } 

  useEffect(() => {
    checkBookmark();
    checkLiked()
  }, []); 


  const handleLikeClick = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    
    if (liked) {

      await unsetLikesContent(user_id, contentId);
    } else {

      await setLikesContent(user_id, contentId, contentTypeId,
        title, addr1, addr2, areaCode, sigunguCode, firstimage, mapX, mapY);
    }

    const ret = await checkLikesContent(user_id, contentId);

    setLikesCount(ret.likes_count)
    setLiked(ret.my_check)


    // setBookmarked(!bookmarked);
  };

  const handleBookmarkClick = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    
    let result;

    if (bookmarked) {

      result = await unsetFavorite(user_id, contentId);
    } else {

      result = await setFavorites(user_id, contentId, contentTypeId,
        title, addr1, addr2, areaCode, sigunguCode, firstimage, mapX, mapY);
    }
    
    
    const ret = await checkFavorite(user_id, contentId);
    setBookmarked(ret)
    // setBookmarked(!bookmarked); // 직접 DB상태를 확인하는 것으로 변경
  };

  const handleCardClick = () => {
    navigate(`../detail/${contentId}`); 
  };

  return (
    <div className="bg-white rounded-[20px] shadow-lg overflow-hidden w-64 min-w-10 relative">
      <div onClick={handleCardClick} >
        <div className="relative">
          <img
            src={firstimage}
            alt={title}
            className="w-[277px] h-[250px] object-cover"
          />
          <img
            src={
              bookmarked
                ? "/images/i_bookmarks2.png"
                : "/images/i_bookmarks.png"
            }
            className="absolute top-2 right-3 p-2 cursor-pointer transition"
            onClick={handleBookmarkClick}
            alt="bookmark icon"
          />
        </div>
      </div>
      <div className="p-4 flex flex-col justify-between">
        <a href= {contentId} target="_blank" rel="noopener noreferrer">
        <div>
          <p className="text-sm text-blue-500">{addr1}</p>
          <h3 className="text-[18px] text-black">{title}</h3>
          <div className="flex items-center">
            <img
              src={liked
                   ? "/images/heart-f.png"
                   : "/images/heart-o.png"}
              className="w-[23px]"
              onClick={handleLikeClick}
              alt="heart icon"
            />
            <span>{likesCount}</span>
          </div>
        </div>
        </a>
      </div>
    </div>
  );
}

export default EventCard;

