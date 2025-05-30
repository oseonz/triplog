// src/recoil/courseDataAtom.js
import { atom } from "recoil";

export const courseDataState = atom({
  key: "courseDataState",
  default: [],
});

export const pl = atom({
  key: "selectedTypeState",
  default: "12", // 기본값: 여행지
});
