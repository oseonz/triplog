import React from "react";

function DetailLayout({ children }) {
  return (
    <div className="w-full pt-16 container m-auto text-black">
      <main>{children}</main>
    </div>
  );
}

export default DetailLayout;
