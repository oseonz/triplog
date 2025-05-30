import React from "react";

function ListViewComp({ listdata, checkLike, checkFavorite }) {
  return (
    <>
      {listdata?.map((item) => (
        <div key={item.contentid}>
          <h3>{item.title}</h3>
          <h3>{item.addr1}</h3>좋아요 {item.likes_count}
          <button
            onClick={() => checkLike(item.contentid)}
            className="bg-blue-300 rounded-md px-2 py-1"
          >
            {item.mylike ? "좋아요 취소" : "좋아요"}
          </button>
          <button
            onClick={() => checkFavorite(item.contentid)}
            className="bg-pink-300 rounded-md px-2 py-1"
          >
            {item.favorite ? "즐겨찾기 해제" : "즐겨찾기"}
          </button>
          {item.favorite && <span>❤</span>}
        </div>
      ))}
    </>
  );
}

export default ListViewComp;
