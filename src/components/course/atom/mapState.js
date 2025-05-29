import { atom } from "recoil";

export const mapCenterState = atom({
  key: "mapCenterState",
  default: { lat: 37.566826, lng: 126.9786567 },
});

export const mapLevelState = atom({
  key: "mapLevelState",
  default: 5,
});
