import { atom } from "recoil";

export const keywordState = atom({
  key: "keywordState",
  default: "",
});

export const searchResultState = atom({
  key: "searchResultState",
  default: [],
});
