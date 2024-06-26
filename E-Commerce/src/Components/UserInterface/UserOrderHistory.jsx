import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FaRegTrashCan } from "react-icons/fa6";
import { OrderHistoryAction } from "../../Store/OrderHistorySlice";
function UserOrderHistory() {
  const dispatch = useDispatch();
  const orderHistory = useSelector((store) => store.orderHistory);

  const handleDeleteOrderHistory = async (e) => {
    const userId = localStorage.getItem("userId");
    let data = {};
    (data.userId = userId), (data.orderId = e._id);
    await fetch("http://localhost:3000/deleteOrderHistory", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => res);
    dispatch(OrderHistoryAction.deleteHistory(e._id));
  };

  return (
    <div className="w-full h-max ">
      {orderHistory && orderHistory.length == 0 && (
        <h1 className="text-center text-[1.2vw]">
          You don't have any order history yet.
        </h1>
      )}
      {orderHistory &&
        orderHistory.map((e, id) => {
          return (
            <details
              open={
                orderHistory.length === orderHistory.length - id ? true : false
              }
              key={id}
            >
              <summary className="relative cursor-pointer flex justify-around  text-[0.8vw] my-[2vh] bg-yellow-50 py-4">
                <span>Order no. {orderHistory.length - id}</span> Date :
                {e.order.createdAt}
                <span>Cart Total : Rs {e.order.total}/-</span>
                <span>
                  Status :{" "}
                  <span
                    className={`${
                      e.order.orderStatus === "cancelled"
                        ? "text-red-500"
                        : "text-green-500"
                    }`}
                  >
                    {e.order.orderStatus}
                  </span>
                </span>
                <FaRegTrashCan
                  onClick={() => {
                    handleDeleteOrderHistory(e);
                  }}
                  className="absolute right-[3%] top-[50%] -translate-y-1/2"
                />
              </summary>
              <div className="w-full ">
                <div className="flex justify-evenly flex-wrap items-center">
                  {e.order.items.map((item, id) => {
                    return (
                      <div
                        key={id}
                        className="products w-[385px] max-[850px]:w-[345px] flex  max-sm:mt-8 flex-col justify-center p-5 items-center max-[850px]:rounded-[14px] rounded-[24px] border-2 border-[#F0F0F0] shadow-md active:scale-[0.98] transition ease-in-out duration-200"
                      >
                        <Link
                          to={`/Shop/${item.item.id}/${item.item.name}`}
                          onClick={() => {
                            console.log(window.scrollTo(0, 0));
                          }}
                        >
                          <img
                            src={item.item.image}
                            width={340}
                            id="img"
                            className="rounded-[24px] max-[850px]:rounded-[14px]"
                          />
                        </Link>
                        <div className="mt-4 relative w-[100%]">
                          <span className="text-lg font-medium text-[#55555579]">
                            {item.item.brand}
                          </span>
                          <h5 className="font-semibold my-1 text-lg text-[#1a1a1a]">
                            {item.item.name}
                          </h5>
                          <h4 className="font-semibold text-2xl text-[#088178]">
                            ${item.item.price}
                          </h4>
                          <p className=" absolute right-4  p-2 rounded-[50%] top-1/3 transition ease duration-150 flex gap-2">
                            Qty <span>{item.quantity}</span>
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </details>
          );
        })}
    </div>
  );
}

export default UserOrderHistory;

//
