import React from "react";

function EventDetail({ intro, detail }) {

  const formatDate = (str) => {
    if (!str || str.length !== 8) return "날짜 오류";
    const year = str.slice(0, 4);
    const month = str.slice(4, 6);
    const day = str.slice(6, 8);
    return `${year}년 ${month}월 ${day}일`;
  };

  return (
    <ul className="ps-20">
              <li className="items-start flex gap-2 float-left w-[100%] pt-1">
        <span className="text-[18px] w-[90px]">• 홈페이지 </span>
        <span
          dangerouslySetInnerHTML={{
            __html:
              detail?.homepage?.replace(/\n/g, "<br>") || "정보 없음",
          }}
        />
      </li>

      <li className="items-start flex gap-2 float-left w-[100%] pt-1">
        <span className="text-[18px] w-[90px]">• 행사기간 </span>
        <span>
          {intro?.eventstartdate && intro?.eventenddate
            ? `${formatDate(intro.eventstartdate)} ~ ${formatDate(intro.eventenddate)}`
            : "정보 없음"}
        </span>
      </li>

      <li className="items-start flex gap-2 float-left w-[100%] pt-1">
        <span className="text-[18px] w-[90px]">• 운영시간 </span>
        <span>
              {intro?.sponsor1 ? intro.sponsor1  : "정보 없음"}
        </span>
      </li>

      <li className="items-start flex gap-2 float-left w-[100%] pt-1">
        <span className="text-[18px] w-[90px]">• 행사장소</span>
        <span>
          { intro?.eventplace ? `${intro.eventplace}` : "정보 없음"}          
        </span>
      </li>
      <li className="items-start flex gap-2 float-left w-[100%] pt-1">
        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;</span>
        <span>  { detail?.addr1 ? `${detail.addr1} ${detail.addr2}` : '' } </span> {/* 행사장 주소 */}
      </li>

      <li className="items-start flex gap-2 float-left w-[50%] pt-1">
        <span className="text-[18px] w-[90px]">• 이용요금 </span>
        <span
          dangerouslySetInnerHTML={{
            __html:
              intro?.usetimefestival?.replace(/\n/g, "<br>") || "정보 없음",
          }}
        />
      </li>


      <li className="items-start flex gap-2 float-left w-[100%] pt-1">
        <span className="text-[18px] w-[90px]">• 행사주최 </span>
        <span>
              {intro?.sponsor1 ? intro.sponsor1  : "정보 없음"}
        </span>
      </li>
      <li className="items-start flex gap-2 float-left w-[100%] pt-1">
        <span className="text-[18px] w-[90px]">• 지원기관 </span>
        <span>
              {intro?.sponsor2 ? intro.sponsor2  : "정보 없음"}          
        </span>
      </li>

      <li className="items-start flex gap-2 float-left w-[50%] pt-1">
        <span className="text-[18px] w-[90px]">• 문의전화 </span>
        <span>
              {detail?.tel ? detail.tel : "정보 없음"}       
        </span>
      </li>


    </ul>
  );
}

export default EventDetail;
