import axios from "axios";

export const fetchTourPlaces = async (
  contentTypeId = "",
  minCount = 10,
  keyword = "",
  region = null
) => {
  const SEARCH_URL =
    "https://apis.data.go.kr/B551011/KorService1/searchKeyword1";
  const TOUR_API_KEY =
    "qKhW5l3qMZ7vggfkiEeB/roS7hi+V2mYQVSFqnuBbsow954NYhnhwmoFYa7VYRgN0avF6WpT2K7FqLAxtAyoyA==";
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

  if (region) {
    params.areaCode = region.areaCode;
    if (region.sigunguCode) {
      params.sigunguCode = region.sigunguCode;
    }
  }

  try {
    const res = await axios.get(SEARCH_URL, { params });
    const itemList = res.data?.response?.body?.items?.item;

    const rawItems = Array.isArray(itemList) ? itemList : [itemList];
    return rawItems.filter((item) => item.firstimage); // 이미지 있는 것만 반환
  } catch (e) {
    console.error("❌ 관광지 검색 실패", e);
    return [];
  }
};

export const fetchDetailIntro = async (contentId, contentTypeId) => {
  const DETAIL_URL = "https://apis.data.go.kr/B551011/KorService1/detailIntro1";
  const TOUR_API_KEY = "👉 인증키";

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
    return Array.isArray(item) ? item[0] : item;
  } catch (err) {
    console.error("❌ detailIntro 호출 실패", err);
    return {};
  }
};

export const fetchDetailImages = async (contentId) => {
  const IMAGE_URL = "https://apis.data.go.kr/B551011/KorService1/detailImage1";
  const TOUR_API_KEY = "👉 인증키";

  const params = {
    ServiceKey: TOUR_API_KEY,
    contentId,
    MobileOS: "ETC",
    MobileApp: "TripLog",
    imageYN: "Y",
    subImageYN: "Y",
    numOfRows: 10,
    _type: "json",
  };

  try {
    const res = await axios.get(IMAGE_URL, { params });
    const itemList = res.data?.response?.body?.items?.item;
    const raw = Array.isArray(itemList) ? itemList : [itemList];
    return raw.filter((img) => img.originimgurl || img.smallimageurl);
  } catch (e) {
    console.error("❌ 이미지 목록 에러", e);
    return [];
  }
};
