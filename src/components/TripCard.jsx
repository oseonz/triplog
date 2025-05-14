import React from "react";

function TripCard({ image, title, location, tag }) {
  return (
    <div className="bg-white rounded-[20px] shadow-lg overflow-hidden w-64 min-w-10 relative">
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-[277px] h-[250px] object-cover"
        />
        {/* 하트 아이콘 */}
        <img
          src="../public/images/i_bookmarks.png"
          className="absolute top-2 right-3 p-2 hover:color-red-500 transition"
          alt=""
        />
      </div>
      <div className="p-4 flex flex-col justify-between">
        <div>
          <p className="text-sm text-blue-500">{location}</p>
          <h3 className="text-[18px] text-black">{title}</h3>
          <div className="flex items-center">
            <img
              src="../public/images/i_heart2.png"
              className="w-[23px]"
              alt=""
            />
            {/* <p className="">{heart_count}</p> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TripCard;
