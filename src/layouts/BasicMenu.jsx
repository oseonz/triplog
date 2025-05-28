import React from "react";
import { Link } from "react-router-dom";

//헤더
function BasicMenu({ children }) {
  return (
    <nav className="flex justify-between container items-center mx-auto py-3">
      <h1>
        <Link to="/">
          <img src="/src/assets/logo.svg" alt="triplog" />
        </Link>
      </h1>
      <ul className="flex gap-11 text-xl">
        <li>
          <Link
            to={"/intro"}
            className={`${
              location.pathname.startsWith("/intro") ? "text-blue-700" : ""
            }`}
          >
            소개
          </Link>
        </li>
        <li className="relative group">
          <Link
            to={"/search"}
            className={`${
              location.pathname.startsWith("/search") ? "text-blue-700" : ""
            }`}
          >
            여행검색
          </Link>
          <div className="absolute hidden group-hover:block bg-white shadow-md p-2 rounded w-[120px]">
            <span className="flex flex-col items-center gap-3">
              <Link to="/search/place">여행지</Link>
              <Link to="/search/food">음식점</Link>
            </span>
          </div>
        </li>
        <li className="relative group">
          <Link
            to={"/course/list"}
            className={`${
              location.pathname.startsWith("/course") ? "text-blue-700" : ""
            }`}
          >
            여행만들기
          </Link>
          <div className="absolute hidden group-hover:block bg-white shadow-md p-2 rounded w-[120px]">
            <span className="flex flex-col items-center gap-3">
              <Link to="/course/list">추천코스</Link>
              <Link to="/course/builder">콕콕플래너</Link>
            </span>
          </div>
          <main>{children}</main>
        </li>
        <li className="relative group">
          <Link
            to={"/info"}
            className={`${
              location.pathname.startsWith("/info") ? "text-blue-700" : ""
            }`}
          >
            여행정보
          </Link>
          <div className="absolute hidden group-hover:block bg-white shadow-md p-2 rounded w-[120px]">
            <span className="flex flex-col items-center gap-3">
              <Link to="/info/event">공연/행사</Link>
              <Link to="/info/article">여행기사</Link>
            </span>
          </div>
        </li>
      </ul>
      <ul className="flex text-xl hidden">
        <li>
          <Link to={"/login"}>로그인/회원가입</Link>
        </li>
      </ul>
      <ul className="flex text-xl">
        <li className="relative group">
          <Link to={"/mypage"}>
            <img src="/images/i_user.png" alt="user" />
          </Link>
          <div className="absolute hidden group-hover:block bg-white shadow-md p-2 rounded w-[120px] top-8">
            <span className="flex flex-col items-center gap-3">
              <Link to="/login">로그아웃</Link>
              <Link to={"/mypage"}>마이페이지</Link>
            </span>
          </div>
        </li>
      </ul>
    </nav>
  );
}

export default BasicMenu;
