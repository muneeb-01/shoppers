import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Navbar() {
  const bagItems = useSelector((store) => store.bagItems);
  const userInformation = useSelector((store) => store.userinformation);
  return (
    <div className="flex justify-around items-center py-[2.5rem] drop-shadow shadow">
      <div>
        <Link
          to="/"
          className="flex gap-4 justify-center items-center text-[2.4rem] font-semibold"
        >
          <img src="/Assets/logo.png" alt="" />
          <h2>SHOPPERS</h2>
        </Link>
      </div>
      <div>
        <ul className="flex text-[1.17rem] font-medium gap-6">
          {["Shop", "Men", "Women", "Kids"].map((val, idx) => {
            return (
              <Link to={val} className="cursor-pointer" key={idx}>
                {val}
              </Link>
            );
          })}
        </ul>
      </div>
      <div>
        <div className="flex justify-center items-center gap-4">
          {localStorage.getItem("auth-token") ? (
            <Link to="/user">
              <div className="size-[3.1em] border-gray-300 border-2 bg-slate-100 rounded-full overflow-hidden">
                <img
                  className="w-full object-cover"
                  src={
                    userInformation && userInformation.info.length === 1
                      ? userInformation.profile
                      : "/Assets/profile.png"
                  }
                  alt=""
                />
              </div>
            </Link>
          ) : (
            <Link to="Login">
              <button className="px-8 py-3 rounded-full text-[1.17rem] font-medium  border border-gray-400 text-gray-700 hover:bg-gray-100 focus:outline-none">
                Login
              </button>
            </Link>
          )}
          <Link to="Cart" className="relative">
            {bagItems.length > 0 && (
              <div className="absolute top-0 right-[-8px] rounded-full bg-red-500 text-white size-5 text-center text-[0.8rem] ">
                {bagItems.length}
              </div>
            )}
            <img src="/Assets/cart_icon.png" alt="" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
