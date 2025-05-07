import React from "react";

function AuthLayout({ children }) {
  return (
    <>
      <div className="flex container items-center mx-auto"></div>
      <div>{children}</div>
    </>
  );
}

export default AuthLayout;
