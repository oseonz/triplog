import axios from "axios";

// 공통 키, URL
const TOUR_API_KEY =
  "qKhW5l3qMZ7vggfkiEeB/roS7hi+V2mYQVSFqnuBbsow954NYhnhwmoFYa7VYRgN0avF6WpT2K7FqLAxtAyoyA==";
const LOCATION_URL =
  "https://apis.data.go.kr/B551011/KorService2/detailCommon2";
const INTRO_URL = "https://apis.data.go.kr/B551011/KorService2/detailIntro2";

// 상세 데이터 가져오기
export const tourApiViewOne = async (contentId) => {
  const params = {
    ServiceKey: TOUR_API_KEY,
    MobileOS: "ETC",
    MobileApp: "TripLog",
    contentId,
    _type: "json",
    numOfRows: 10,
    pageNo: 1,
  };

  const res = await axios.get(LOCATION_URL, { params });
  return res.data.response.body.items.item[0];
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
    const res = await axios.get(INTRO_URL, { params });
    return res.data.response.body.items.item[0];
  } catch (e) {
    console.error("❌ 상세정보 API 호출 실패", e);
    return null;
  }
};
