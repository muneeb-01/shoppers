import React, { useState } from "react";
import { FaList } from "react-icons/fa6";
import { Link, Outlet } from "react-router-dom";
function Home() {
  return (
    <section className="w-full bg-gray-50 min-h-[100vh] flex">
      <div className="w-[19%] sticky top-[16%] h-[84vh] p-6 flex flex-col gap-4  bg-white">
        <Link
          to="/"
          className="w-full flex justify-center items-center gap-5 flex-nowrap cursor-pointer bg-gray-100 py-5 rounded-md"
        >
          <img className="size-[1.5rem]" src="/Assets/cart_icon.png" alt="" />
          <h4 className="text-[1.2rem]">Add Product</h4>
        </Link>
        <Link
          to="/ProductsList"
          className="w-full flex justify-center items-center gap-5 flex-nowrap cursor-pointer bg-gray-100 py-5 rounded-md"
        >
          <FaList className="size-[1.3rem]" />
          <h4 className="text-[1.2rem]">Products List</h4>
        </Link>
        <Link
          to="/OrderList"
          className="w-full flex justify-center items-center gap-5 flex-nowrap cursor-pointer bg-gray-100 py-5 rounded-md"
        >
          <FaList className="size-[1.3rem]" />
          <h4 className="text-[1.2rem]">Orders List</h4>
        </Link>
      </div>
      <div className="w-[81%] min-h-screen p-8">
        <Outlet />
      </div>
    </section>
  );
}

export default Home;
