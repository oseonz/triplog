import React from "react";
import BasicMenu from "./BasicMenu";

//헤더 필요한 부분에 필수
function MainLayout({ children }) {
  return (
    <>
      <div className="bg-white shadow-md z-50 relative text-black">
        <BasicMenu />
      </div>
      <div>{children}</div>
    </>
  );
}

export default MainLayout;
