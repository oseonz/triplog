import axios from 'axios';

// 공통 키, URL
const TOUR_API_KEY =
    'qKhW5l3qMZ7vggfkiEeB/roS7hi+V2mYQVSFqnuBbsow954NYhnhwmoFYa7VYRgN0avF6WpT2K7FqLAxtAyoyA==';
const LOCATION_URL =
    'https://apis.data.go.kr/B551011/KorService2/detailCommon2';
const INTRO_URL = 'https://apis.data.go.kr/B551011/KorService2/detailIntro2';

// 상세 데이터 가져오기
export const tourApiViewOne = async (contentId) => {
    console.log("-------------------- tourApiViewOne")
    console.log("contentID : ", contentId)
    const params = {
        ServiceKey: TOUR_API_KEY,
        MobileOS: 'ETC',
        MobileApp: 'TripLog',
        contentId,
        _type: 'json',
        numOfRows: 10,
        pageNo: 1,
    };

    const res = await axios.get(LOCATION_URL, { params });
    return res.data.response.body.items.item[0];
};

export const fetchDetailIntro = async (contentId, contentTypeId) => {
    console.log("-------------------- fetchDetailIntro")
    const params = {
        ServiceKey: TOUR_API_KEY,
        contentId,
        contentTypeId,
        MobileOS: 'ETC',
        MobileApp: 'TripLog',
        _type: 'json',
    };

    try {
        const res = await axios.get(INTRO_URL, { params });
        const item = res.data?.response?.body?.items?.item;
        // ✅ 배열이면 첫 번째 객체만 추출
        return Array.isArray(item) ? item[0] : item;
    } catch (e) {
        console.error('❌ 상세정보 API 호출 실패', e);
        return null;
    }
};


// 지역 기반 장소 검색 API 호출
export const searchGovContent = async (params) => {
    const {
    contenttypeid = '',
    page = 1,
    size = 10,
    areacode = '',
    sigungucode = '',
    } = params;

    const API_KEY = "1C42I%2BvS%2BEOZYNiN75gWOVCBJS9WTLlqh%2B4hyBjlz7njXFfqG%2Fv4qj5j6sA1TaQLjkS0T7qY1H%2BDFEUSTxiTJw%3D%3D";
    const AREA_URL = `http://apis.data.go.kr/B551011/KorService1/areaBasedList1?serviceKey=${API_KEY}&pageNo=${page}&numOfRows=${size}&MobileApp=AppTest&MobileOS=ETC&arrange=O&areaCode=${areacode != null ? areacode : ''}&sigunguCode=${sigungucode != null ? sigungucode : ''}&contentTypeId=${contenttypeid}&cat1=&cat2=&cat3=&_type=json`;


    console.log('📤 API 요청 파라미터:', contenttypeid, areacode);


    try {
        const res = await axios.get(AREA_URL);
        console.log(res);
        const itemList = res.data?.response?.body;
        const raw = Array.isArray(itemList) ? itemList : [itemList];
        console.log('📥 searchGovContent : API 결과:', itemList); // ✅ 이렇게만!

        return itemList;
    } catch (e) {
        console.error('❌ searchGovContent : 지역 기반 장소 검색 실패', e);
        return [];
    }
};