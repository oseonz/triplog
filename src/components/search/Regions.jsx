import React from "react";

function Regions({ children }) {
  return (
    <div className="w-full bg-blue-300 p-6 text-black">
      <main>{children}</main>
    </div>
  );
}

export default Regions;
