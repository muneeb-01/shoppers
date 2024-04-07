import React from "react";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
function UserApp() {
  return (
    <>
      <section className="w-full bg-gray-50  flex">
        <div className="w-[19%] sticky top-[1%] border-y-4 border-gray-100 h-[100vh] p-6 flex flex-col gap-4  bg-white">
          <h3 className="text-center my-[3vh] text-[1.5rem]">User Profile</h3>
          <Link
            to="/user"
            className="w-full  flex justify-center items-center gap-5 flex-nowrap cursor-pointer bg-gray-100 py-5 rounded-md"
          >
            <h4 className="text-[1.2rem]">User info</h4>
          </Link>
          <div className="w-full flex justify-center items-center gap-5 flex-nowrap cursor-pointer bg-gray-100 py-5 rounded-md">
            <h4 className="text-[1.2rem]">Favrioutes</h4>
          </div>
          <Link
            to="/user/orderHistory"
            className="w-full flex justify-center items-center gap-5 flex-nowrap cursor-pointer bg-gray-100 py-5 rounded-md"
          >
            <h4 className="text-[1.2rem]">Order History</h4>
          </Link>
          <Link
            to="/user/setting"
            className="w-full flex justify-center items-center gap-5 flex-nowrap cursor-pointer bg-gray-100 py-5 rounded-md"
          >
            <h1 className="text-[1.2rem]">Setting</h1>
          </Link>
          <div className="w-full flex justify-center items-center gap-5 flex-nowrap cursor-pointer  py-5 rounded-md">
            <button
              onClick={() => {
                localStorage.removeItem("auth-token");
                localStorage.removeItem("userId");
                window.location.replace("/");
              }}
              className="text-[1.2rem] bottom-[10%] absolute text-center text-red-500"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="w-[81%]  p-8">
          <Outlet />
        </div>
      </section>
    </>
  );
}

export default UserApp;
