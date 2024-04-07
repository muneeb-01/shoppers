import React, { useState } from "react";
import Navbar from "./Components/MAIN/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./Components/MAIN/Footer";
import FetchingItems from "./Components/MAIN/FetchingItems";
function App() {
  return (
    <>
      <Navbar />
      <FetchingItems />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
