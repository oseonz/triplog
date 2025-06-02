import { atom } from "recoil";

export const userState = atom({
  key: "userState",
  default: {
    id: "2", // 기본 사용자 ID (예시)
    nickname: "steve", // 필요하면 닉네임 등도 포함 가능
    email: "",
  },
});
