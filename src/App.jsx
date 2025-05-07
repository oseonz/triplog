import React from "react";
// import "./styles/App.css";
import { RouterProvider } from "react-router-dom";
import root from "./router/root";

function App() {
  return <RouterProvider router={root} />;
}

export default App;
