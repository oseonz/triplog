import React from "react";
import { Link, Outlet } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";

function IndexPage() {
  return (
    <MainLayout>
      <div>
        <span>
          {/* <Link to="list">공연/행사</Link>
          <Link to="builder">여행기사</Link> */}
        </span>
        <Outlet />
      </div>
    </MainLayout>
  );
}

export default IndexPage;
