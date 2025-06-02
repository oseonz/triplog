import axios from "axios";
import React, { useEffect, useState } from "react";
//공연/행사 카드

function ArticlesCard({ index, title, description, link, pubDate}) {
  // const [bookmarked, setBookmarked] = useState(false);

  // const handleBookmarkClick = (e) => {
  //   e.stopPropagation();
  //   e.preventDefault();
  //   setBookmarked(!bookmarked);
  // };

  const getPlainText = (html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  };
    
  const truncate = (text, maxLength) => {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  const [imageUrl, setimageUrl] = useState("");
  
  const API_URL = `http://localhost:8081/api/image/extract?url=${link}`;
  
  useEffect(()=>{
      async function fetchData() {
        try {
          const res = await axios(API_URL);
          console.log(res.data.imageUrl);
          setimageUrl(res.data.imageUrl);

        } catch (error) {
          console.error("Error fetching image:", error);    
        }
      }
      fetchData();
  },[link]);

  return (
   
      <div className="bg-[#F3F5F6] flex justify-center">
        <div className="container">

          <div className="flex w-full overflow-hidden rounded-2xl shadow-md mb-8">
            <a href={link} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center hover:opacity-80 transition">
              <div className="w-[200px] h-[200px] bg-gray-300"><img src={imageUrl} alt="" /></div>
              <div className="flex-1 h-[200px] bg-white p-4 flex flex-col justify-center ps-10">
                <p className="text-xl mb-2">{getPlainText(title)}</p>              
                <p className="text-sm text-blue-500">{truncate(getPlainText(description), 100)}</p>
                <p className="text-xs text-gray-500">{pubDate}</p>
              </div>
            </a>
          </div>
        </div>
      </div>

  );
}

export default ArticlesCard;

