import React from "react";

function SearchLayout({ children }) {
  return (
    <div className="w-full bg-blue-300 p-6">
      {/* <div className="mb-6 text-center"></div> */}
      <main>{children}</main>
    </div>
  );
}

export default SearchLayout;
