import React from "react";
import { useSelector } from "react-redux";
import Product from "./Product";

function ShopProducts() {
  const items = useSelector((store) => store.items);

  return (
    <section id="product">
      <div className="flex justify-around  px-[80px] pb-20 flex-wrap max-sm:px-[25px] max-[850px]:p-[20px]">
        {items.map((item) => {
          return <Product key={item.id} item={item} />;
        })}
      </div>
    </section>
  );
}

export default ShopProducts;
