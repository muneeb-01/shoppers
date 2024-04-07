import React from "react";
import { useSelector } from "react-redux";
import Product from "../MAIN/Product";
function FeaturedProducts({ Heading }) {
  const items = useSelector((store) => store.items);
  const featuredItems = useSelector((store) => store.featuredItems);

  return (
    <section id="product-1">
      <div className=" text-center">
        <h1 className="text-[83px] text-[#000] font-semibold max-lg:text-6xl max-xl:text-7xl max-sm:text-3xl">
          {Heading}
        </h1>
        <p className="text-2xl pb-1 font-light text-[#555] max-sm:text-lg">
          Summer Collection New Modern Design's
        </p>
      </div>

      <div className="flex justify-around  px-[80px] pb-20 flex-wrap max-sm:px-[25px] max-[850px]:p-[20px]">
        {featuredItems.map((item) => {
          return <Product key={item.id} item={item} />;
        })}
      </div>
    </section>
  );
}

export default FeaturedProducts;
