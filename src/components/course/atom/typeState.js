import { atom } from "recoil";

export const selectedTypeState = atom({
  key: "selectedTypeState",
  default: "12", // 초기값: 여행지
});
