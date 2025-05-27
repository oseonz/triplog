import axios from "axios";

// view data tourApi
const LOCATION_URL1 =
  "https://apis.data.go.kr/B551011/KorService2/detailCommon2";

const TOUR_API_KEY =
  "qKhW5l3qMZ7vggfkiEeB/roS7hi+V2mYQVSFqnuBbsow954NYhnhwmoFYa7VYRgN0avF6WpT2K7FqLAxtAyoyA==";

export const tourApiViewOne = async (contentId) => {
  const params = {
    ServiceKey: TOUR_API_KEY,
    MobileOS: "ETC",
    MobileApp: "TripLog",
    contentId,
    // contentTypeId,
    // defaultYN: "Y",
    // overviewYN: "Y",
    _type: "json",
    numOfRows: 10,
    pageNo: 1,
  };

  const res = await axios.get(LOCATION_URL1, { params });
  const items = res.data.response.body.items.item[0];

  return items;
};
