import React from "react";
import AuthLayout from "../../layouts/AuthLayout";
import { Link } from "react-router-dom";
//회원가입 페이지
function JoinPage() {
  return (
    <AuthLayout>
      <div className="flex justify-center items-center min-h-screen">
        <div className="flex flex-col items-center">
          <Link to="/">
            <h1>
              <img
                src="../src/assets/logo.svg"
                alt="triplog"
                className="mb-4"
              />
            </h1>
          </Link>
          <form action="" className="flex flex-col gap-8">
            <input
              type="text"
              name="email"
              placeholder="이메일"
              className="py-4 ps-4 pr-40 border border-gray-300"
            />
            <input
              type="text"
              name="password"
              placeholder="비밀번호"
              className="py-4 ps-4 pr-40 border border-gray-300"
            />
            <input
              type="submit"
              value="로그인"
              className="bg-blue text-white py-4"
            />
          </form>

          <div className="w-full mt-2 flex gap-1 items-start pl-1 text-sm text-gray-500">
            <span>트립로그 회원이 아니신가요?</span>
            <Link to="/join">
              <span className="text-blue hover:underline cursor-pointer">
                회원가입하러가기
              </span>
            </Link>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}

export default JoinPage;
