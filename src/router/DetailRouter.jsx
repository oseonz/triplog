import React, { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";

import DetailPage from "../pages/search/DetailPage";
import DetailPage2 from "../pages/search/DetailPage2";

function DetailRouter() {
  const { contentid } = useParams();
  const [contentTypeId, setContentTypeId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchContentType = async () => {
      try {
        const res = await fetch(
          `https://apis.data.go.kr/B551011/KorService2/detailCommon2?serviceKey=l0WtV%2F7q2V%2FEH86zOC4y54rjJIci1FU1Dx8yW149%2F2RoPbMkLFPBsMUxIr97MJRg%2FlxhrnVx9xKksuIihnSJsw%3D%3D&MobileOS=ETC&MobileApp=AppTest&_type=json&contentId=${contentid}&numOfRows=10&pageNo=1`
        );
        const data = await res.json();
        const item = data?.response?.body?.items?.item?.[0];
        if (item?.contenttypeid) {
          setContentTypeId(item.contenttypeid);
        } else {
          setNotFound(true);
        }
      } catch (err) {
        console.error("contenttypeid 로딩 실패:", err);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchContentType();
  }, [contentid]);

  if (loading) return <div>불러오는 중...</div>;
  if (notFound) return <div>잘못된 요청이거나 데이터가 없음</div>;

  if (contentTypeId === "12") return <DetailPage />;
  if (contentTypeId === "39") return <DetailPage2 />;

  return <div>지원하지 않는 contenttypeid: {contentTypeId}</div>;
}

export default DetailRouter;
