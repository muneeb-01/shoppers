import React from "react";
import FlatBanner from "../MAIN/FlatBanner";
import ProductsDisplay from "../MAIN/ProductsDisplay";
import { useSelector } from "react-redux";
function men() {
  const items = useSelector((store) => store.items);
  const kidsFilterdItems = items.filter((e) => e.category === "kid");
  return (
    <>
      <FlatBanner message={"FLAT 50% OFF"} hour={12} minutes={20} />
      <ProductsDisplay items={kidsFilterdItems} />
    </>
  );
}

export default men;
