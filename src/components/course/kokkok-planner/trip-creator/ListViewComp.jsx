import React from 'react';

function ListViewComp({ place, checkLike, checkFavorite }) {
    return (
        <div className="border p-4 rounded shadow mb-4">
            <div className="flex items-center gap-3">
                <img
                    src={place.firstimage}
                    alt={place.title}
                    className="w-[90px] h-[90px] object-cover rounded-full"
                />
                <div>
                    <div>
                        <div className="flex justify-between  ">
                            <h2 className="text-lg font-bold">{place.title}</h2>
                            <img
                                src={
                                    place.favorite
                                        ? '/images/i_bookmarks2.png'
                                        : '/images/i_bookmarks.png'
                                }
                                alt="좋아요 하트"
                                onClick={(e) => {
                                    e.stopPropagation(); // 카드 클릭과 충돌 방지
                                    checkFavorite(place.contentid); // 좋아요 토글 함수 호출
                                }}
                                className="w-5 h-5 cursor-pointer"
                            />
                        </div>
                        <p className="truncate w-[250px]">{place.addr1}</p>
                    </div>
                    <div className="flex items-center">
                        <img
                            src={
                                place.mylike
                                    ? '/images/i_heart2.png'
                                    : '/images/i_heart.png'
                            }
                            alt="좋아요 하트"
                            onClick={(e) => {
                                e.stopPropagation(); // 카드 클릭과 충돌 방지
                                checkLike(place.contentid); // 좋아요 토글 함수 호출
                            }}
                            className="w-5 h-5 cursor-pointer"
                        />
                        <button onClick={() => checkLike(place.contentid)}>
                            {place.likes_count}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ListViewComp;
