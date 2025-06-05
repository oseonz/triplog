import React from 'react';

function DetailInfo2({ intro, detail }) {
    return (
        <ul className="ps-20">
            <li className="items-start flex gap-2 float-left w-[50%] pt-1">
                <span className="text-[18px] w-[130px]">• 문의 및 안내</span>
                <span
                    dangerouslySetInnerHTML={{
                        __html:
                            intro?.infocenterfood?.replace(/\n/g, '<br>') ||
                            '정보 없음',
                    }}
                />
            </li>
            <li className="items-start flex gap-2 float-left w-[50%] pt-1">
                <span className="text-[18px] w-[130px]">• 이용 시간</span>
                <span
                    dangerouslySetInnerHTML={{
                        __html:
                            intro?.opentimefood?.replace(/\n/g, '<br>') ||
                            '정보 없음',
                    }}
                />
            </li>
            <li className="items-start flex gap-2 float-left w-[50%] pt-1">
                <span className="text-[18px] w-[130px]">• 주소</span>
                <span
                    dangerouslySetInnerHTML={{
                        __html:
                            detail?.addr1?.replace(/\n/g, '<br>') ||
                            '정보 없음',
                    }}
                />
            </li>
            <li className="items-start flex gap-2 float-left w-[50%] pt-1">
                <span className="text-[18px] w-[130px]">• 주차</span>
                <span
                    dangerouslySetInnerHTML={{
                        __html:
                            intro?.parkingfood?.replace(/\n/g, '<br>') ||
                            '정보 없음',
                    }}
                />
            </li>
            <li className="items-start flex gap-2 float-left w-[50%] pt-1">
                <span className="text-[18px] w-[130px]">• 휴일</span>
                <span
                    dangerouslySetInnerHTML={{
                        __html:
                            intro?.restdatefood?.replace(/\n/g, '<br>') ||
                            '정보 없음',
                    }}
                />
            </li>
        </ul>
    );
}

export default DetailInfo2;
