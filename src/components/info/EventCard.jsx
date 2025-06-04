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
      console.log("call unsetLikesContent");
      await unsetLikesContent(user_id, contentId);
    } else {
      console.log("call setLikesContent", user_id);
      await setLikesContent(user_id, contentId, contentTypeId,
        title, addr1, addr2, areaCode, sigunguCode, firstimage, mapX, mapY);
    }

    console.log("------>user, content ",user_id, contentId)
    const ret = await checkLikesContent(user_id, contentId);
    console.log("checkLikesContent RET : ", ret);
    setLikesCount(ret.likes_count)
    setLiked(ret.my_check)


    // setBookmarked(!bookmarked);
  };

  const handleBookmarkClick = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    
    let result;

    if (bookmarked) {
      console.log("call unsetFavorites");
      result = await unsetFavorite(user_id, contentId);
    } else {
      console.log("call setFavorites", user_id);
      result = await setFavorites(user_id, contentId, contentTypeId,
        title, addr1, addr2, areaCode, sigunguCode, firstimage, mapX, mapY);
    }

    console.log("------>user, content ",user_id, contentId)
    const ret = await checkFavorite(user_id, contentId);
    console.log("RET : ", ret);
    setBookmarked(ret)


    // setBookmarked(!bookmarked);
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
