import { regionList } from "./regionData";

// 입력된 keyword에서 지역명 포함 여부 검사
export function getRegionCodeFromKeyword(keyword) {
  const matched = regionList.find((region) => keyword.includes(region.name));
  return matched || null;
}
