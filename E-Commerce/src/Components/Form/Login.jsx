import React from "react";
import { useState } from "react";
function Login({ setCurrent }) {
  const handleLogin = async (e) => {
    e.preventDefault();
    let form = e.target;
    let formdata = new FormData(form);
    let formObj = Object.fromEntries(formdata.entries());
    let responceData;
    await fetch(`http://localhost:3000/login`, {
      method: "post",
      headers: {
        Accept: "application/formdata",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formObj),
    })
      .then((res) => res.json())
      .then((data) => (responceData = data));

    if (responceData.success) {
      localStorage.setItem("auth-token", responceData.token);
      localStorage.setItem("userId", responceData.user);
      formdata = "";
      window.location.replace("/user");
    } else {
      alert(responceData.errors);
    }
  };

  return (
    <div className="w-[38rem] bg-white rounded-lg shadow-md flex flex-col gap-4 px-[3.5rem] py-[3.5rem]">
      <h2 className="text-[1.9rem] font-medium"> Login</h2>
      <form onSubmit={(e) => handleLogin(e)} action="">
        <div className="flex flex-col items-center justify-center gap-6">
          <input
            required
            type="text"
            name="username"
            placeholder="Username"
            className="px-[1.4rem] border-2 w-full py-[1.1rem] text-[1.1rem] rounded-md "
          />
          <input
            required
            type="password"
            name="password"
            placeholder="Password"
            className="px-[1.4rem] border-2 w-full py-[1.1rem] text-[1.1rem] rounded-md "
          />
          <button
            className="px-[1.4rem] bg-[#E73A38] text-white w-full py-[0.9rem]
            text-[1.1rem] rounded-md "
          >
            Login
          </button>
        </div>
      </form>
      <p className="text-1.1rem font-medium">
        Don't have an Account?
        <a
          onClick={() => setCurrent(true)}
          className="text-[#E73A38] cursor-pointer hover:underline"
        >
          {" "}
          Create One{" "}
        </a>
      </p>
    </div>
  );
}

export default Login;
