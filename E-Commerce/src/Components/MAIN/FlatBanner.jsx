import React from "react";

function FlatBanner({ message, hour, minutes }) {
  return (
    <section className="w-full px-[8vw] py-[2vw]">
      <div className="w-full h-[18vw] bg-gradient-to-r from-[#FBE2E2] to-[#fff] flex justify-between items-center ">
        <div className="px-[2vw] py-[2vw] flex flex-col justify-around items-start h-full">
          <h2 className="text-[6rem] font-medium tracking-tighter leading-[6.2rem]  text-[#EA7638]">
            {message}
          </h2>
          <h4 className="text-[2rem] text-[#EA7638] font-normal tracking-tight leading-[2rem]">
            {hour}
            <span className="text-[#000]"> HOURS</span> {minutes}
            <span className="text-[#000]"> MINUTES</span>
          </h4>
          <button className="flex justify-center items-center gap-4 px-8 py-3 border-2 hover:border-black transition-all active:scale-95 rounded-full text-[1.17rem] font-medium mt-5 hover:bg-transparent hover:text-black text-white focus:outline-none bg-[#EA7638] ">
            Explore Now
          </button>
        </div>
        <div className="pr-[10vw]">
          <img className="h-[18vw]" src="/Assets/hero_image.png" alt="" />
        </div>
      </div>
    </section>
  );
}

export default FlatBanner;
