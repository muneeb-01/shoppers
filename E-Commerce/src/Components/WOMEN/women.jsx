import React, { useCallback } from "react";
import FlatBanner from "../MAIN/FlatBanner";
import ProductsDisplay from "../MAIN/ProductsDisplay";
import { useSelector } from "react-redux";

function women() {
  const items = useSelector((store) => store.items);
  const womenFilterdItems = items.filter((e) => e.category === "women");
  return (
    <>
      <FlatBanner message={"FLAT 50% OFF"} hour={12} minutes={20} />
      <ProductsDisplay items={womenFilterdItems} />
    </>
  );
}

export default women;
