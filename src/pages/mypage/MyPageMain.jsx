import React from "react";
import MainLayout from "../../layouts/MainLayout";
import WhitePageLayout from "../../layouts/WhitePageLayout";
//마이페이지
function MyPageMain() {
  return (
    <MainLayout>
      <WhitePageLayout />
      <div className="min-h-screen bg-[#F3F5F6] text-black">MyPageMain</div>
    </MainLayout>
  );
}

export default MyPageMain;
