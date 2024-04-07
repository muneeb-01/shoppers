import React from "react";
import Product from "./Product";
import { MdKeyboardArrowDown } from "react-icons/md";
function FeaturedProducts({ items }) {
  return (
    <section id="product-1" className="px-[80px]">
      <div className=" text-center flex justify-between items-center">
        <p className="inline">
          Showing 1-16 out of <span>{items.length}</span> Products
        </p>
        <button className="px-8 py-3 flex items-center justify-center gap-2 rounded-full text-[1.17rem] font-medium  border border-gray-400 text-gray-700 hover:bg-gray-100 focus:outline-none">
          sort by <MdKeyboardArrowDown className="size-[1.3vw]" />
        </button>
      </div>
      <div className="flex justify-around   pb-20 flex-wrap max-sm:px-[25px] max-[850px]:p-[20px]">
        {items.map((item) => {
          return <Product key={item.id} item={item} />;
        })}
      </div>
    </section>
  );
}

export default FeaturedProducts;
