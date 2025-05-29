import axios from "axios";

const LOCATION_URL1 =
  "https://apis.data.go.kr/B551011/KorService2/detailCommon2";

const TOUR_API_KEY =
  "qKhW5l3qMZ7vggfkiEeB/roS7hi+V2mYQVSFqnuBbsow954NYhnhwmoFYa7VYRgN0avF6WpT2K7FqLAxtAyoyA==";

export const fetchTourPlaces = async (contentId) => {
  const params = {
    ServiceKey: TOUR_API_KEY,
    MobileOS: "ETC",
    MobileApp: "TripLog",
    contentId,
    _type: "json",
    numOfRows: 10,
    pageNo: 1,
  };

  try {
    const res = await axios.get(LOCATION_URL1, { params });
    const raw = res.data.response.body.items.item;

    // 배열이 아니면 배열로 감싸고, 이미지 있는 항목만 반환
    const cleaned = (Array.isArray(raw) ? raw : [raw]).filter(
      (item) => item && item.firstimage
    );

    return cleaned;
  } catch (error) {
    console.error("❌ 관광 정보 가져오기 실패:", error);
    return [];
  }
};

// 지역 기반 장소 검색 API 호출
// export const fetchTourPlaces = async (
//   contentTypeId = "",
//   minCount = 10,
//   areaCode = null,
//   sigunguCode = null
// ) => {
//   const AREA_URL = "https://apis.data.go.kr/B551011/KorService1/areaBasedList1";
//   const TOUR_API_KEY =
//     "qKhW5l3qMZ7vggfkiEeB/roS7hi+V2mYQVSFqnuBbsow954NYhnhwmoFYa7VYRgN0avF6WpT2K7FqLAxtAyoyA==";

//   const params = {
//     ServiceKey: TOUR_API_KEY,
//     MobileOS: "ETC",
//     MobileApp: "TripLog",
//     numOfRows: minCount,
//     pageNo: 1,
//     contentTypeId,
//     _type: "json",
//   };

//   // ✅ 지역 코드 기반으로만 요청
//   if (areaCode) params.areaCode = areaCode;
//   if (sigunguCode) params.sigunguCode = sigunguCode;

//   try {
//     const res = await axios.get(AREA_URL, { params });
//     const itemList = res.data?.response?.body?.items?.item;

//     // ✅ 결과가 없으면 빈 배열 반환
//     if (!itemList) return [];

//     const raw = Array.isArray(itemList) ? itemList : [itemList];
//     return raw.filter((item) => item && item.firstimage); // 이미지 있는 항목만 반환
//   } catch (e) {
//     console.error("❌ 지역 기반 장소 검색 실패", e);
//     return [];
//   }
// };

// 상세 이미지 API 호출
export const fetchDetailImages = async (contentId) => {
  const IMAGE_URL = "https://apis.data.go.kr/B551011/KorService1/detailImage1";
  const TOUR_API_KEY =
    "qKhW5l3qMZ7vggfkiEeB/roS7hi+V2mYQVSFqnuBbsow954NYhnhwmoFYa7VYRgN0avF6WpT2K7FqLAxtAyoyA==";

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

    // ✅ itemList가 undefined면 빈 배열 처리
    if (!itemList) return [];

    const raw = Array.isArray(itemList) ? itemList : [itemList];
    return raw.filter((img) => img.originimgurl || img.smallimageurl);
  } catch (e) {
    console.error("❌ 이미지 목록 에러", e);
    return [];
  }
};

export const fetchDetailIntro = async (contentId, contentTypeId) => {
  const DETAIL_URL = "https://apis.data.go.kr/B551011/KorService1/detailIntro1";
  const TOUR_API_KEY =
    "qKhW5l3qMZ7vggfkiEeB/roS7hi+V2mYQVSFqnuBbsow954NYhnhwmoFYa7VYRgN0avF6WpT2K7FqLAxtAyoyA==";

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
    return item;
  } catch (e) {
    console.error("❌ 상세정보 API 호출 실패", e);
    return null;
  }
};

export async function fetchTourPlacesByCoords(
  mapX, // 경도 (lng)
  mapY, // 위도 (lat)
  radius = 10000, // 반경 (미터)
  numOfRows = 10, // 한 페이지 결과 수
  contentTypeId = "" // 콘텐츠 타입 (빈 문자열이면 전체)
) {
  const { data } = await axios.get(LOCATION_URL, {
    params: {
      ServiceKey: TOUR_API_KEY,
      mapX,
      mapY,
      radius,
      listYN: "Y",
      arrange: "B", // 정렬 방식: B=제목순
      numOfRows,
      pageNo: 1,
      contentTypeId,
      MobileOS: "ETC",
      MobileApp: "TripLog",
      _type: "json",
    },
  });
  // API 응답 구조에 맞춰 items.item 반환
  return data.response.body.items.item || [];
}
