import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function UserProfile() {
  const userInformation = useSelector((store) => store.userinformation);

  return (
    <div className="w-full  h-full flex flex-col gap-[6vh] justify-start items-start px-[8vw] py-[8vh]">
      <div className="flex items-center gap-[1.6vw]">
        <div className="size-[8em] overflow-hidden rounded-full">
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
        <div className="flex flex-col">
          <h2 className="text-[1.25rem]">
            {userInformation ? userInformation.username : "null"}
          </h2>
          {userInformation && userInformation.info.length === 1 ? (
            <h2 className="text-[0.9rem] text-gray-500">
              <span>
                {userInformation ? userInformation.info[0]?.city : "null"}
              </span>
              ,
              <span>
                {userInformation ? userInformation.info[0]?.province : "null"}
              </span>
            </h2>
          ) : (
            <h2 className="text-[0.9rem] opacity-50 text-gray-500">
              <span>city</span>, <span>province</span>
            </h2>
          )}
        </div>
      </div>
      <div className="w-full  flex flex-wrap gap-[3.5vh]">
        {userInformation && userInformation.info.length === 1 ? (
          <>
            <div>
              <h5 className="text-[0.9rem] text-gray-600">Name</h5>
              <h5 className=" text-nowrap text-[1.15rem] text-gray-700 bg-gray-200 rounded-lg max-w-max px-[5vw] py-[0.6vh] shadow-inner">
                {userInformation ? userInformation.info[0]?.name : "null"}
              </h5>
            </div>
            <div>
              <h5 className="text-[0.9rem] text-gray-600">FullName</h5>
              <h5 className=" text-nowrap text-[1.15rem] text-gray-700 bg-gray-200 rounded-lg max-w-max px-[5vw] py-[0.6vh] shadow-inner">
                {userInformation ? userInformation.info[0]?.surname : "null"}
              </h5>
            </div>
            <div>
              <h5 className="text-[0.9rem] text-gray-600">email</h5>
              <h5 className=" text-nowrap text-[1.15rem] text-gray-700 bg-gray-200 rounded-lg max-w-max px-[5vw] py-[0.6vh] shadow-inner">
                {userInformation ? userInformation.info[0]?.email : "null"}
              </h5>
            </div>
            <div>
              <h5 className="text-[0.9rem] text-gray-600">Phone</h5>
              <h5 className=" text-nowrap text-[1.15rem] text-gray-700 bg-gray-200 rounded-lg max-w-max px-[5vw] py-[0.6vh] shadow-inner">
                {userInformation ? userInformation.info[0]?.phone : "null"}
              </h5>
            </div>
            <div>
              <h5 className="text-[0.9rem] text-gray-600">Province</h5>
              <h5 className=" text-nowrap text-[1.15rem] text-gray-700 bg-gray-200 rounded-lg max-w-max px-[5vw] py-[0.6vh] shadow-inner">
                {userInformation ? userInformation.info[0]?.province : "null"}
              </h5>
            </div>
            <div>
              <h5 className="text-[0.9rem] text-gray-600">City</h5>
              <h5 className=" text-nowrap text-[1.15rem] text-gray-700 bg-gray-200 rounded-lg max-w-max px-[5vw] py-[0.6vh] shadow-inner">
                {userInformation ? userInformation.info[0]?.city : "null"}
              </h5>
            </div>
            <div>
              <h5 className="text-[0.9rem] text-gray-600">Area/Sector/Block</h5>
              <h5 className=" text-nowrap text-[1.15rem] text-gray-700 bg-gray-200 rounded-lg max-w-max px-[5vw] py-[0.6vh] shadow-inner">
                {userInformation ? userInformation.info[0]?.area : "null"}
              </h5>
            </div>
            <div>
              <h5 className="text-[0.9rem] text-gray-600">Full Address</h5>
              <h5 className=" text-nowrap text-[1.15rem] text-gray-700 bg-gray-200 rounded-lg max-w-max px-[5vw] py-[0.6vh] shadow-inner">
                {userInformation
                  ? userInformation.info[0]?.fullAddress
                  : "null"}
              </h5>
            </div>
          </>
        ) : (
          <>
            <div>
              <h5 className="text-[0.9rem] text-gray-600">Name</h5>
              <h5 className=" text-nowrap text-[1.15rem] text-gray-700 bg-gray-200 rounded-lg max-w-max px-[5vw] py-[0.6vh] shadow-inner">
                -
              </h5>
            </div>
            <div>
              <h5 className="text-[0.9rem] text-gray-600">FullName</h5>
              <h5 className=" text-nowrap text-[1.15rem] text-gray-700 bg-gray-200 rounded-lg max-w-max px-[5vw] py-[0.6vh] shadow-inner">
                -
              </h5>
            </div>
            <div>
              <h5 className="text-[0.9rem] text-gray-600">email</h5>
              <h5 className=" text-nowrap text-[1.15rem] text-gray-700 bg-gray-200 rounded-lg max-w-max px-[5vw] py-[0.6vh] shadow-inner">
                -
              </h5>
            </div>
            <div>
              <h5 className="text-[0.9rem] text-gray-600">Phone</h5>
              <h5 className=" text-nowrap text-[1.15rem] text-gray-700 bg-gray-200 rounded-lg max-w-max px-[5vw] py-[0.6vh] shadow-inner">
                -
              </h5>
            </div>
            <div>
              <h5 className="text-[0.9rem] text-gray-600">Province</h5>
              <h5 className=" text-nowrap text-[1.15rem] text-gray-700 bg-gray-200 rounded-lg max-w-max px-[5vw] py-[0.6vh] shadow-inner">
                -
              </h5>
            </div>
            <div>
              <h5 className="text-[0.9rem] text-gray-600">City</h5>
              <h5 className=" text-nowrap text-[1.15rem] text-gray-700 bg-gray-200 rounded-lg max-w-max px-[5vw] py-[0.6vh] shadow-inner">
                -
              </h5>
            </div>
            <div>
              <h5 className="text-[0.9rem] text-gray-600">Area/Sector/Block</h5>
              <h5 className=" text-nowrap text-[1.15rem] text-gray-700 bg-gray-200 rounded-lg max-w-max px-[5vw] py-[0.6vh] shadow-inner">
                -
              </h5>
            </div>
            <div>
              <h5 className="text-[0.9rem] text-gray-600">Full Address</h5>
              <h5 className=" text-nowrap text-[1.15rem] text-gray-700 bg-gray-200 rounded-lg max-w-max px-[5vw] py-[0.6vh] shadow-inner">
                -
              </h5>
            </div>
          </>
        )}
        <Link
          to="/user/setting"
          className="text-nowrap text-center text-[1.15rem] text-white font-medium  bg-red-500 rounded-lg w-full px-[5vw] py-[0.6vh] shadow-md"
        >
          Edit info
        </Link>
      </div>
    </div>
  );
}

export default UserProfile;
