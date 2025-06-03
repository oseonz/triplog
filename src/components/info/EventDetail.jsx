import React from "react";

function EventDetail({ intro, detail }) {
  return (
    <ul className="ps-20">
              <li className="items-start flex gap-2 float-left w-[100%] pt-1">
        <span className="text-[18px] w-[90px]">• 홈페이지 </span>
        <span
          dangerouslySetInnerHTML={{
            __html:
              detail.homepage?.replace(/\n/g, "<br>") || "정보 없음",
          }}
        />
      </li>

      <li className="items-start flex gap-2 float-left w-[100%] pt-1">
        <span className="text-[18px] w-[90px]">• 문의전화 </span>
        <span
          dangerouslySetInnerHTML={{
            __html:
              detail.telname ? detail.telname + ' (' + detail.tel +')' : "정보 없음",
          }}
        />
      </li>

      <li className="items-start flex gap-2 float-left w-[100%] pt-1">
        <span className="text-[18px] w-[90px]">• 주 &nbsp;&nbsp; &nbsp;&nbsp; 소</span>
        <span>
          { detail.addr1 ? `${detail.addr1} ${detail.addr2}` : "정보 없음"}          
        </span>
      </li>
    </ul>
  );
}

export default EventDetail;
