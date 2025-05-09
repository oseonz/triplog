import axios from "axios";
import { getRegionCodeFromKeyword } from "../utils/regionUtils";

// ✅ 관광지 목록 (지도용)
const LIST_URL =
  "https://apis.data.go.kr/B551011/KorService1/locationBasedList1";

// ✅ 상세정보 API
const DETAIL_URL = "https://apis.data.go.kr/B551011/KorService1/detailIntro1";

// ✅ 인증키
const TOUR_API_KEY =
  "qKhW5l3qMZ7vggfkiEeB/roS7hi+V2mYQVSFqnuBbsow954NYhnhwmoFYa7VYRgN0avF6WpT2K7FqLAxtAyoyA==";

// ✅ 장소 리스트 API
export const fetchTourPlaces = async (
  contentTypeId = "",
  minCount = 10,
  keyword = ""
) => {
  const region = getRegionCodeFromKeyword(keyword);
  let pageNo = 1;
  const results = [];

  const SEARCH_URL =
    "https://apis.data.go.kr/B551011/KorService1/searchKeyword1";

  // ✅ keyword가 있을 경우: 검색 API 사용
  if (keyword.trim()) {
    try {
      const params = {
        ServiceKey: TOUR_API_KEY,
        MobileOS: "ETC",
        MobileApp: "TripLog",
        numOfRows: minCount,
        pageNo: 1,
        keyword,
        contentTypeId,
        _type: "json",
      };

      // ✅ 지역명 자동 추출된 경우 코드 추가
      if (region) {
        params.areaCode = region.areaCode;
        if (region.sigunguCode) {
          // params.sigunguCode = region.sigunguCode;
        }
      }

      const res = await axios.get(SEARCH_URL, {
        params,
        headers: { Accept: "application/json" },
      });

      const itemList = res.data?.response?.body?.items?.item;
      if (!itemList) {
        console.warn("❌ 검색 결과 없음");
        return [];
      }
      const rawItems = Array.isArray(itemList) ? itemList : [itemList];
      const filtered = rawItems.filter(
        (item) => item.firstimage && item.firstimage !== ""
      );

      return filtered.slice(0, minCount);
    } catch (error) {
      console.error("❌ 키워드 검색 API 오류:", error);
      return [];
    }
  }

  while (results.length < minCount) {
    const params = {
      ServiceKey: TOUR_API_KEY,
      mapX: 126.9786567,
      mapY: 37.566826,
      radius: 10000,
      MobileOS: "ETC",
      MobileApp: "TripLog",
      contentTypeId,
      numOfRows: 20,
      pageNo,
      _type: "json",
    };

    try {
      const res = await axios.get(LIST_URL, {
        params,
        headers: { Accept: "application/json" },
      });

      const { data } = res;
      if (
        data?.response?.header?.resultCode !== "0000" ||
        !data?.response?.body?.items?.item
      ) {
        break;
      }

      const itemList = data.response.body.items.item;
      const rawItems = Array.isArray(itemList) ? itemList : [itemList];
      const filtered = rawItems.filter(
        (item) => item && item.firstimage && item.firstimage !== ""
      );
      console.log(itemList);

      results.push(...filtered);
      pageNo += 1;
      if (rawItems.length < params.numOfRows) break;
    } catch (error) {
      console.error("🚨 관광지 API 호출 에러:", error);
      break;
    }
  }

  return results.slice(0, minCount);
};

export const fetchDetailIntro = async (contentId, contentTypeId) => {
  const params = {
    ServiceKey: TOUR_API_KEY,
    contentId,
    contentTypeId,
    MobileOS: "ETC",
    MobileApp: "TripLog",
    _type: "json",
  };

  try {
    const res = await axios.get(DETAIL_URL, { params });
    const item = res.data?.response?.body?.items?.item;

    console.log("✅ detailIntro item:", item);

    return Array.isArray(item) ? item[0] : item;
  } catch (error) {
    console.error("❌ detailIntro API 실패", error);
    return {};
  }
};
