import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DetailLayout from "../../layouts/DetailLayout";
import { Link } from "react-router-dom";
import BlueBtn from "../../components/common/BlueBtn.jsx";
import { getOne } from "../../api/placeLikes.jsx";

//지도 스크립트
<script
  type="text/javascript"
  src="//dapi.kakao.com/v2/maps/sdk.js?appkey=d14b3407f2ab8aa29337555dccd89793&libraries=services,clusterer"
></script>;

function DetailPage() {
  const { contentid } = useParams();
  const [detail, setDetail] = useState(null);
  const [intro, setIntro] = useState(null);
  const [likes, setLikes] = useState(null);

  const [params] = useState({
    user_id: "",
    areacode: 1,
    contenttypeid: 12,
    sigungucode: 1,
    page: 0,
    size: 12,
  });

  useEffect(() => {
    if (!contentid) return;

    getOne(contentid)
      .then((data) => {
        console.log("받은 응답:", data);

        // ✅ 좋아요 수만 저장
        if (data && data.item) {
          setLikes(data.item.likes_count ?? 0);
        } else {
          setLikes(0);
        }
      })
      .catch((err) => {
        console.error("❌ getOne API 호출 실패:", err);
        setLikes(0);
      });
  }, [contentid]);

  //상세 정보, 안내 정보 이펙트
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://apis.data.go.kr/B551011/KorService2/detailCommon2?serviceKey=l0WtV%2F7q2V%2FEH86zOC4y54rjJIci1FU1Dx8yW149%2F2RoPbMkLFPBsMUxIr97MJRg%2FlxhrnVx9xKksuIihnSJsw%3D%3D&MobileOS=ETC&MobileApp=AppTest&_type=json&contentId=${contentid}&numOfRows=10&pageNo=1`
        );
        const data = await res.json();
        const item = data.response.body.items.item[0];
        setDetail(item);
        console.log("detail 응답:", data);

        if (item.contenttypeid) {
          const contentTypeId = item.contenttypeid;
          const resIntro = await fetch(
            `https://apis.data.go.kr/B551011/KorService2/detailIntro2?serviceKey=l0WtV%2F7q2V%2FEH86zOC4y54rjJIci1FU1Dx8yW149%2F2RoPbMkLFPBsMUxIr97MJRg%2FlxhrnVx9xKksuIihnSJsw%3D%3D&MobileOS=ETC&MobileApp=AppTest&_type=json&contentId=${contentid}&contentTypeId=${contentTypeId}&numOfRows=10&pageNo=1`
          );
          const dataIntro = await resIntro.json();
          setIntro(dataIntro.response.body.items.item[0]);
          console.log("intro 응답:", dataIntro);
        }
      } catch (err) {
        console.error("API 호출 실패:", err);
      }
    };

    fetchData();
  }, [contentid]);

  //지도 이펙트
  useEffect(() => {
    if (!detail || !window.kakao || !window.kakao.maps) return;

    const container = document.getElementById("map");

    const x = parseFloat(detail.mapx);
    const y = parseFloat(detail.mapy);

    if (!x || !y) {
      console.warn("위치 정보 없음");
      return;
    }

    const options = {
      center: new window.kakao.maps.LatLng(y, x),
      level: 3,
    };

    const map = new window.kakao.maps.Map(container, options);

    const marker = new window.kakao.maps.Marker({
      position: new window.kakao.maps.LatLng(y, x),
    });

    marker.setMap(map);
  }, [detail]);

  if (!detail) return <div>데이터 불러오는 중...</div>;

  return (
    <div className="min-h-screen bg-white text-black">
      <DetailLayout>
        <div className="place-items-center gap-5">
          <p className="text-4xl font-bold pb-5">{detail.title}</p>
          <p className="pb-5 text-gray-500">{detail.addr1}</p>
        </div>
        <div className="pt-12 place-items-end pb-5">
          <div className="flex gap-2">
            <div className="flex items-center gap-1">
              <img src="/images/i_heart.png" alt="" />
              <p>{likes}</p>
            </div>
            <div className="flex items-center gap-1">
              <img src="/images/i_bookmarks.png" alt="" />
              <p>북마크</p>
            </div>
            <div className="flex items-center gap-1">
              <img src="/images/i_share.png" alt="" />
              <p>공유하기</p>
            </div>
          </div>
        </div>
        {/* <div className="flex bg-white border-y-2 justify-center mb-7">
          <div className="border-r-2 border-grary-300">
            <p className="text-xl font-bold p-5 px-[100px]">사진 보기</p>
          </div>
          <div className="border-r-2 border-grary-300">
            <p className="text-xl font-bold p-5 px-[100px]">상세 정보</p>
          </div>
          <div className="border-r-2 border-grary-300">
            <p className="text-xl font-bold p-5 px-[100px]">추천 여행지</p>
          </div>
          <div className="">
            <p className="text-xl font-bold p-5 px-[100px]">로그톡톡</p>
          </div>
        </div> */}
        <div className="relative h-[375px] overflow-hidden">
          <img
            src={detail.firstimage || "/no_img.jpg"}
            alt={detail.title}
            className="absolute top-[-10px] left-0 w-full h-full object-cover"
          ></img>
        </div>

        <div className="mb-12">
          <div className="mb-2">
            <p className="text-2xl font-bold">상세 정보</p>
          </div>
          <div className="border border-black"></div>
          <div className="p-5">
            <p>{detail.overview || "상세 설명이 없습니다."}</p>
          </div>
        </div>
        <div className="shadow-lg">
          <div id="map" className="h-[300px] w-full">
            지도
          </div>
          <div className="bg-white p-10 flex mb-12">
            <ul className="ps-20">
              <li className="items-start flex gap-2 float-left w-[50%] pt-1">
                <span className="text-[18px] w-[130px]">• 문의 및 안내</span>
                <span
                  dangerouslySetInnerHTML={{
                    __html:
                      intro?.infocenter?.replace(/\n/g, "<br>") || "정보 없음",
                  }}
                />
              </li>
              <li className="items-start flex gap-2 float-left w-[50%] pt-1">
                <span className="text-[18px] w-[130px]">• 이용 시간</span>
                <span
                  dangerouslySetInnerHTML={{
                    __html:
                      intro?.usetime?.replace(/\n/g, "<br>") || "정보 없음",
                  }}
                />
              </li>
              <li className="items-start flex gap-2 float-left w-[50%] pt-1">
                <span className="text-[18px] w-[130px]">• 주소</span>
                <span
                  dangerouslySetInnerHTML={{
                    __html: intro?.addr1?.replace(/\n/g, "<br>") || "정보 없음",
                  }}
                />
              </li>
              <li className="items-start flex gap-2 float-left w-[50%] pt-1">
                <span className="text-[18px] w-[130px]">• 주차</span>
                <span
                  dangerouslySetInnerHTML={{
                    __html:
                      intro?.parking?.replace(/\n/g, "<br>") || "정보 없음",
                  }}
                />
              </li>
              <li className="items-start flex gap-2 float-left w-[50%] pt-1">
                <span className="text-[18px] w-[130px]">• 휴일</span>
                <span
                  dangerouslySetInnerHTML={{
                    __html:
                      intro?.restdate?.replace(/\n/g, "<br>") || "정보 없음",
                  }}
                />
              </li>
            </ul>
          </div>
        </div>
        <div className="mb-12">
          <div className="mb-2">
            <p className="text-2xl font-bold">추천 여행지</p>
          </div>
          <div className="border border-black"></div>
          <div className="pt-5">
            {/* <Link to="../detail">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {cards.map((card, i) => (
                  <TripCard
                    key={i}
                    title={card.title}
                    image={card.image}
                    location={card.location}
                    tag={card.tag}
                  />
                ))}
              </div>
            </Link> */}
          </div>
        </div>
        <div className="flex justify-center items-center gap-5 mb-12">
          <BlueBtn />
        </div>
        <div className="mb-12">
          <div className="mb-2">
            <p className="text-2xl font-bold">로그 톡톡</p>
          </div>
          <textarea
            name="comment"
            placeholder="소중한 댓글을 남겨주세요."
            className="w-[1200px] h-[100px] border border-gray-300 p-4 placeholder:text-start resize-none mb-4"
          />
          <div className="flex justify-end">
            <button className="bg-blue-500 text-white py-2 px-6 border border-blue-500 hover:bg-blue-600">
              등록
            </button>
          </div>
        </div>
      </DetailLayout>
    </div>
  );
}

export default DetailPage;
