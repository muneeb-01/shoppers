import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { userInformationAction } from "../../Store/userInformationSlice";
import { toast } from "react-toastify";
function UserSetting() {
  const [profile, setprofile] = useState(null);
  const dispatch = useDispatch();

  const imageHandeler = (e) => {
    setprofile(e.target.files[0]);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    let form = e.target;
    let formdata = new FormData(form);
    let userId = localStorage.getItem("userId");
    let imgUrl;
    let profiledata = new FormData();
    profiledata.append("profile", profile);
    if (!profile) {
      toast.error("select profile to proceed!", {
        position: "top-center",
        autoClose: 1500,
        pauseOnHover: false,
        draggable: true,
        theme: "dark",
      });
      return;
    }
    await fetch(`http://localhost:3000/uploadProfile`, {
      method: "post",
      headers: {
        Accept: "application/json",
      },
      body: profiledata,
    })
      .then((res) => res.json())
      .then((data) => (imgUrl = data));
    if (imgUrl.success) {
      formdata.append("profile", imgUrl.img_url);
      formdata.append("userId", userId);
      let stringifiedForm = JSON.stringify(
        Object.fromEntries(formdata.entries())
      );
      const responce = await fetch("http://localhost:3000/userinfo", {
        method: "post",
        headers: {
          Accept: "application/formdata",
          "Content-Type": "application/json",
        },
        body: stringifiedForm,
      })
        .then((res) => res.json())
        .then((data) => {
          dispatch(userInformationAction.addInitialInformation(data.userInfo));
        });
      window.location.replace("/user");
    } else {
      toast.error("something went wrong!", {
        position: "top-center",
        autoClose: 1500,
        pauseOnHover: false,
        draggable: true,
        theme: "dark",
      });
    }
  };
  return (
    <div className="w-full  h-full flex flex-col gap-[2vh] justify-start items-start px-[8vw] py-[3vh]">
      <h3 className="text-center  text-[1.5rem]">Edit info</h3>

      <div className="flex gap-[1.52vw] items-center justify-start">
        <div
          onClick={() => {
            document.querySelector("#profile").click();
          }}
          className="w-[6vw] h-[6vw]  border-4 border-[#dadada] bg-gray-200 rounded-full overflow-hidden"
        >
          <img
            src={
              profile == null
                ? "/Assets/addProfile.png"
                : URL.createObjectURL(profile)
            }
            className="w-full h-full object-cover"
            alt=""
          />
        </div>
        <div className="flex flex-col">
          <h2 className="text-[1.25rem]">Muneeb Ahmed</h2>
          <h2 className="text-[0.9rem] text-gray-500">
            <span>Karachi</span>,<span>Sindh</span>
          </h2>
        </div>
      </div>

      <form
        onSubmit={(e) => submitHandler(e)}
        className="w-full flex flex-wrap gap-[3vh]"
      >
        <input
          onChange={(e) => imageHandeler(e)}
          id="profile"
          name="profile"
          placeholder="John"
          type="file"
          className="hidden"
        />
        <div className="flex flex-col w-[20vw]">
          <label htmlFor="name" className="text-[0.9rem] text-gray-600">
            Name
          </label>
          <input
            id="name"
            name="name"
            placeholder="John"
            type="text"
            className="text-nowrap text-[1.15rem] text-gray-700 bg-gray-200 rounded-lg w-full px-[1vw] py-[0.6vh] shadow-inner"
            required
          />
        </div>
        <div className="flex flex-col w-[20vw]">
          <label htmlFor="surname" className="text-[0.9rem] text-gray-600">
            Surname
          </label>
          <input
            id="surname"
            name="surname"
            placeholder="Doe"
            type="text"
            className="text-nowrap text-[1.15rem] text-gray-700 bg-gray-200 rounded-lg w-full px-[1vw] py-[0.6vh] shadow-inner"
            required
          />
        </div>
        <div className="flex flex-col w-[30vw]">
          <label htmlFor="email" className="text-[0.9rem] text-gray-600">
            Email
          </label>
          <input
            id="email"
            name="email"
            placeholder="example@example.com"
            type="email"
            className="text-nowrap text-[1.15rem] text-gray-700 bg-gray-200 rounded-lg w-full px-[1vw] py-[0.6vh] shadow-inner"
            required
          />
        </div>
        <div className="flex flex-col w-[20vw]">
          <label htmlFor="phone" className="text-[0.9rem] text-gray-600">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            placeholder="03121234567"
            className="text-nowrap text-[1.15rem] text-gray-700 bg-gray-200 rounded-lg w-full px-[1vw] py-[0.6vh] shadow-inner"
            required
          />
        </div>
        <div className="flex flex-col w-[20vw]">
          <label htmlFor="province" className="text-[0.9rem] text-gray-600">
            Province
          </label>
          <input
            id="province"
            name="province"
            placeholder="Province"
            type="text"
            className="text-nowrap text-[1.15rem] text-gray-700 bg-gray-200 rounded-lg w-full px-[1vw] py-[0.6vh] shadow-inner"
            required
          />
        </div>
        <div className="flex flex-col w-[20vw]">
          <label htmlFor="city" className="text-[0.9rem] text-gray-600">
            City
          </label>
          <input
            id="city"
            name="city"
            placeholder="City"
            type="text"
            className="text-nowrap text-[1.15rem] text-gray-700 bg-gray-200 rounded-lg w-full px-[1vw] py-[0.6vh] shadow-inner"
            required
          />
        </div>
        <div className="flex flex-col w-[20vw]">
          <label htmlFor="area" className="text-[0.9rem] text-gray-600">
            Area/Block/Sector
          </label>
          <input
            id="area"
            name="area"
            placeholder="Area/Block/Sector"
            type="text"
            className="text-nowrap text-[1.15rem] text-gray-700 bg-gray-200 rounded-lg w-full px-[1vw] py-[0.6vh] shadow-inner"
            required
          />
        </div>
        <div className="flex flex-col w-[40vw]">
          <label htmlFor="fullAddress" className="text-[0.9rem] text-gray-600">
            Full Address
          </label>
          <input
            id="fullAddress"
            name="fullAddress"
            placeholder="Full Address"
            type="text"
            className="text-nowrap text-[1.15rem] text-gray-700 bg-gray-200 rounded-lg w-full px-[1vw] py-[0.6vh] shadow-inner"
            required
          />
        </div>
        <button
          type="submit"
          className="text-nowrap text-[1.15rem] text-white font-medium bg-green-400 rounded-lg w-full px-[5vw] py-[0.6vh] shadow-md"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default UserSetting;
