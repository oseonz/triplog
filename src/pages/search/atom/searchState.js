// src/recoil/courseDataAtom.js
import { atom } from "recoil";

// export const courseDataState = atom({
//   key: "courseDataState",
//   default: [],
// });

export const searchDataState = atom({
  key: "searchDataState",
  default: {
    tourPlaces: [],
    foodPlaces: [],
    likesMap: {}, // contentid: 좋아요 수
    bookmarkedIds: [], // contentid 리스트
  },
});
