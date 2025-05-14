import React from "react";

function AuthLayout({ children }) {
  return (
    <>
      <div className="flex container items-center mx-auto text-black"></div>
      <div>{children}</div>
    </>
  );
}

export default AuthLayout;
