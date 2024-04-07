import React from "react";
import FeaturedProducts from "./FeaturedProducts";
import SmallBanners from "./SmallBanners";
import NewsTeller from "./NewsTeller";
function Home() {
  return (
    <>
      <div className="w-full h-[42.5vw] mb-[4.5vw] bg-gradient-to-b from-[#FAE1FD] to-[#fff] flex justify-center items-center">
        <div className="w-1/2 h-full flex justify-center items-center">
          <div>
            <h4 className="text-[1.8rem] font-normal tracking-tight leading-[6.2rem]">
              NEW ARRIVALS ONLY
            </h4>
            <div>
              <div className="flex justify-start items-center gap-5">
                <h2 className="text-[6rem] font-medium tracking-tight leading-[6.2rem]">
                  new
                </h2>
                <img
                  className=" size-[7rem]"
                  src="./Assets/hand_icon.png"
                  alt=""
                />
              </div>
              <h2 className="text-[6rem] font-medium tracking-tight leading-[6.2rem]">
                collections
              </h2>
              <h2 className="text-[6rem] font-medium tracking-tight leading-[6.2rem]">
                for everyone
              </h2>
              <button className="flex justify-center items-center gap-4 px-8 py-3 border-2 hover:border-black transition-all active:scale-95 rounded-full text-[1.17rem] font-medium mt-5 hover:bg-transparent hover:text-black text-white focus:outline-none bg-[#ff4f4f] ">
                Latest Collection
                <img className="" src="./Assets/arrow.png" alt="" />
              </button>
            </div>
          </div>
        </div>
        <div className="w-1/2 h-full flex justify-center items-center">
          <img className="h-[35vw]" src="./Assets/hero_image.png" alt="" />
        </div>
      </div>
      {/* <FeaturedProducts Heading={"POPULAR IN WOMEN"} /> */}
      <SmallBanners />
      <FeaturedProducts Heading={"NEW COLLECTION"} />
      <NewsTeller />
    </>
  );
}

export default Home;
