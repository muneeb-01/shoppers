import React from "react";
import { PiShoppingCartSimple } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { bagItemsAction } from "../../Store/BagItemsSlice";
import { Link } from "react-router-dom";

function Product({ item }) {
  const dispatch = useDispatch();
  const handleAddToBag = async (item) => {
    dispatch(bagItemsAction.addbagItems({ item, quantity: 1 }));
    const userId = localStorage.getItem("userId");
    const productId = item._id;
    if (!userId) {
      return;
    }
    try {
      const response = await fetch("http://localhost:3000/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          item: productId,
          quantity: 1,
          userId: userId,
        }),
      });
      if (!response) {
        throw new Error("Failed to add to cart");
      }
    } catch (error) {
      console.error("Add to cart error:", error);
    }
  };

  return (
    <>
      <div className="products w-[385px] max-[850px]:w-[345px] flex mt-24 max-sm:mt-8 flex-col justify-center p-5 items-center max-[850px]:rounded-[14px] rounded-[24px] border-2 border-[#F0F0F0] shadow-md active:scale-[0.98] transition ease-in-out duration-200">
        <Link
          to={`/Shop/${item.id}/${item.name}`}
          onClick={() => {
            console.log(window.scrollTo(0, 0));
          }}
        >
          <img
            src={item.image}
            width={340}
            id="img"
            className="rounded-[24px] max-[850px]:rounded-[14px]"
          />
        </Link>
        <div className="mt-4 relative w-[100%]">
          <span className="text-lg font-medium text-[#55555579]">
            {item.brand}
          </span>
          <h5 className="font-semibold my-1 text-lg text-[#1a1a1a]">
            {item.name}
          </h5>
          <h4 className="font-semibold text-2xl text-[#088178]">
            ${item.price}
          </h4>
          <button
            onClick={() => {
              handleAddToBag(item);
            }}
            className=" absolute right-4 hover:bg-[#088178] p-2 rounded-[50%] top-1/3 transition ease duration-150 hover:text-white"
          >
            <PiShoppingCartSimple className="text-3xl" />
          </button>
        </div>
      </div>
    </>
  );
}

export default Product;
