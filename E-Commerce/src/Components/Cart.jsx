import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaRegTrashCan } from "react-icons/fa6";
import { LuCloudLightning, LuMinus, LuPlus } from "react-icons/lu";
import { bagItemsAction } from "../Store/BagItemsSlice";
import { useNavigate } from "react-router-dom";
import { OrderHistoryAction } from "../Store/OrderHistorySlice";
function Cart() {
  const navigate = useNavigate();
  const bagItems = useSelector((store) => store.bagItems);
  const userInformation = useSelector((store) => store.userinformation);
  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId");

  const bagtotal = bagItems.reduce((acc, e) => {
    const price = +e.item.price || 0;
    const quantity = +e.quantity;
    return acc + quantity * price;
  }, 0);
  const handleCheckOut = async () => {
    let checkoutInfo = {};
    const userInfo = userInformation.info;
    let cartTotal =
      bagtotal +
      (bagtotal === 0
        ? 0
        : bagtotal <= 5000
        ? Math.floor(bagtotal * (8 / 100))
        : 0);
    if (cartTotal === 0) {
      return;
    }
    if (userInfo.length === 0) {
      alert("edit user information to proceed...");
      navigate("/user/setting");
      return;
    }
    if (userId) {
      checkoutInfo.userId = userId;
      checkoutInfo.items = bagItems;
      checkoutInfo.total = cartTotal;
      await fetch(`http://localhost:3000/addNewOrder`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(checkoutInfo),
      })
        .then((res) => res.json())
        .then((data) => {
          dispatch(OrderHistoryAction.loadHistory(data.orderHistory.reverse()));
          dispatch(bagItemsAction.initialCart(data.cart));
        });
    }
  };

  const increaseQuantity = async (qty, id, cartQty) => {
    if (cartQty >= 1) {
      dispatch(bagItemsAction.handleQuantity({ qty, id }));
      if (userId) {
        try {
          const response = await fetch(
            "http://localhost:3000/cart/handleQuantity",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                userId,
                qty,
                id,
              }),
            }
          )
            .then((res) => res.json())
            .then((data) => data);
          if (!response) {
            throw new Error("Failed to decrease quantity");
          }
        } catch (error) {}
      }
    }
  };
  const decreaseQuantity = async (qty, id, cartQty) => {
    if (cartQty == 1) {
      return;
    }
    dispatch(bagItemsAction.handleQuantity({ qty, id }));

    if (userId) {
      try {
        const response = await fetch(
          "http://localhost:3000/cart/handleQuantity",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userId,
              qty,
              id,
            }),
          }
        )
          .then((res) => res.json())
          .then((data) => data);
        if (!response) {
          throw new Error("Failed to decrease quantity");
        }
      } catch (error) {}
    }
  };
  const handleRemoveFromBag = async (id, productId) => {
    dispatch(bagItemsAction.deleteBagItems(id));
    if (userId) {
      try {
        const response = await fetch("http://localhost:3000/cart/delete", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId,
            productId,
          }),
        })
          .then((res) => res.json())
          .then((data) => (data = response));
        if (!response) {
          throw new Error("Failed to add to cart");
        }
      } catch (error) {}
    }
  };
  return (
    <>
      <div className="flex gap-[2vw] items-start  px-24 py-10">
        {bagItems && (
          <div className=" w-[70%]  flex flex-col justify-center items-start">
            <h5 className="gap-4 my-4 text-2xl">Cart ({bagItems.length})</h5>
            {bagItems.map((e, id) => {
              return (
                <div
                  key={id}
                  className="w-full  flex justify-center p-6 items-center border-y-2 border-[#ddd8d8]"
                >
                  <div className="w-[15%] h-[12rem]  p-3 ">
                    <div className=" w-full h-full rounded-xl ">
                      <img
                        className="h-full  object-contain"
                        src={e.item.image}
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="w-[70%] h-full  px-5 py-3 ">
                    <div className=" w-full h-full flex flex-col justify-around">
                      <h2 className="text-[1.5rem] leading-[-.5] tracking-tighter">
                        {e.item.name}
                      </h2>
                      <h3 className="text-[1rem] tracking-tight">
                        {e.item.brand}
                      </h3>
                      <p className="text-[0.8rem] leading-[-.8] tracking-tight">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Dolorem ipsam mollitia officiis possimus
                        architecto. Laudantium blanditiis recusandae sit minus,
                        asperiores animi ducimus eaque hic quisquam
                        necessitatibus. Sunt a culpa voluptas.
                      </p>
                      <h3 className="text-[1rem] tracking-tight">Size</h3>
                      <button
                        onClick={() =>
                          handleRemoveFromBag(e.item.id, e.item._id)
                        }
                        className="flex w-min px-3 text-nowrap py-1  tracking-tighter rounded-sm  items-center justify-center  gap-2 text-[0.9rem] border border-slate-300 "
                      >
                        <FaRegTrashCan /> Remove Item
                      </button>
                    </div>
                  </div>
                  <div className="w-[15%] h-[12rem] flex flex-col justify-between items-end">
                    <div className="">
                      <div className="overflow-hidden flex items-center py-1 rounded-md justify-center  w-min text-[1.1rem] border border-slate-300">
                        <button
                          onClick={(event) =>
                            decreaseQuantity(-1, e.item._id, e.quantity)
                          }
                          className="px-3 "
                        >
                          <LuMinus />
                        </button>
                        <button className="px-3  border-x">{e.quantity}</button>
                        <button
                          onClick={() =>
                            increaseQuantity(+1, e.item._id, e.quantity)
                          }
                          className="px-3 "
                        >
                          <LuPlus />
                        </button>
                      </div>
                    </div>
                    <div className="text-2xl">Rs. {e.item.price}/-</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {bagItems.length > 0 && (
          <div className="w-[25%] border-2 px-[1.4vw] py-[2.8vh] border-[#dadada] sticky top-[5%] h-max mt-[6.6vh] rounded-xl ">
            <h2 className="text-[1.4rem]">Cart Total</h2>

            <div className="w-full flex flex-col gap-[1.2vh] px-[1vw] py-[1vh] border border-[#dadada] my-[1.2vh]">
              <p className="border-b py-[1.2vh] flex justify-between items-center text-[1rem] border-[#dadada]">
                Subtotal <span className=" inline-block">Rs. {bagtotal}/-</span>
              </p>
              <p className="border-b py-[1.2vh] text-[1rem] flex justify-between items-center border-[#dadada]">
                Shipping
                <span className=" inline-block">
                  Rs.{" "}
                  {bagtotal === 0
                    ? 0
                    : bagtotal <= 5000
                    ? Math.floor(bagtotal * (8 / 100))
                    : 0}
                  /-
                </span>
              </p>
              <p className=" py-[1.2vh] text-[1.15rem] font-medium flex justify-between items-center">
                Total
                <span className=" inline-block">
                  Rs.{" "}
                  {bagtotal +
                    (bagtotal === 0
                      ? 0
                      : bagtotal <= 5000
                      ? Math.floor(bagtotal * (8 / 100))
                      : 0)}
                  /-
                </span>
              </p>
            </div>
            <button
              onClick={() => {
                handleCheckOut();
              }}
              className="bg-green-500 w-full py-[1.2vh] rounded-lg font-semibold text-white"
            >
              CheckOut
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default Cart;
