import React from "react";
import { Link, Outlet } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import FooterLayout from "../../layouts/FooterLayout";

function IndexPage() {
  return (
    <>
      <MainLayout>
        <div>
          <span>
            {/* <Link to="list">여행 만들기</Link>
          <Link to="builder">코스 만들기</Link> */}
          </span>
          <Outlet />
        </div>
      </MainLayout>
      <FooterLayout />
    </>
  );
}

export default IndexPage;
