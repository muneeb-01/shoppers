import React, { useEffect, useState } from "react";

function OrderList() {
  const [orders, setorders] = useState(null);
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetch(`http://localhost:3000/allOrder`, { signal })
      .then((res) => res.json())
      .then((orders) => {
        setorders(orders.allOrders.reverse());
        console.log(orders.allOrders);
      });
    return () => {};
  }, []);
  const handleOrderStatus = async (changedStatus, id) => {
    let data = {
      status: changedStatus,
      orderId: id,
    };
    data = JSON.stringify(data);

    await fetch("http://localhost:3000/updateOrderStatus", {
      method: "post",
      headers: { "Content-Type": "Application/json" },
      body: data,
    });
  };
  return (
    <div className="w-full mt-[14.5vh] ">
      <h5 className="w-full  my-[3vh] text-[2vw]  text-center">All Orders</h5>
      {orders &&
        orders.map((order, id) => {
          return (
            <details
              key={id}
              close="true"
              className={`border-2 border-[#dadada] py-[1vh] px-[2vw] ${
                id >= 1 && "border-t-0"
              }`}
            >
              <summary className="flex justify-between relative py-[2vh] cursor-pointer marker:content-none">
                <div className="flex text-[1vw] gap-[1.2vw] justify-start items-center">
                  <span>{id + 1}.</span>
                  <div className="w-[3vw] text-[1vw] h-[3vw] bg-slate-300 rounded-full overflow-hidden ">
                    <img
                      className="w-full object-cover"
                      src={order.user.profile}
                      alt=""
                    />
                  </div>
                  <span>{order.user.username}</span>
                </div>
                <div className="flex text-[1vw] gap-[2vw] justify-start items-center">
                  <span>
                    Status :
                    <select
                      name="status"
                      onChange={(e) => {
                        const btn =
                          e.target.parentNode.parentNode.childNodes[5];
                        btn.style.display = "block";
                      }}
                      id="changedStatus"
                    >
                      <option value={order.orderStatus}>
                        {order.orderStatus}
                      </option>
                      <option value="processing">processing</option>
                      <option value="shipped">shipped</option>
                      <option value="delivered">delivered</option>
                      <option value="cancelled">cancelled</option>
                    </select>
                  </span>
                  <span>
                    Date : <span>{order.createdAt}</span>
                  </span>
                  <span>No. of Items : {order.items.length}</span>{" "}
                  <span>
                    Rs <span>{order.total}</span>/-
                  </span>
                  <button
                    onClick={(e) => {
                      const changedStatus =
                        e.target.parentNode.childNodes[0].childNodes[1].value;
                      handleOrderStatus(changedStatus, order._id);
                      e.target.style.display = "none";
                    }}
                    type="submit"
                    id="updateStatus"
                    className="bg-green-500 text-white px-[1vw] py-1 hidden"
                  >
                    Done
                  </button>
                </div>
              </summary>
              <div id="page-container" className="">
                <h4 className="text-center text-[1vw] py-[1.2vh] bg-yellow-50">
                  User information
                </h4>
                <div className="userDetail text-[1vw] p-[1.1vh] flex justify-between items-start border-t py-[2.5vh] px-[2vw] ">
                  <div className="personalInfo flex flex-col gap-[0.5vh] ">
                    <span>
                      name :{" "}
                      {order.user.personalInfo[0].name +
                        order.user.personalInfo[0].surname}
                    </span>
                    <span>Phone : {order.user.personalInfo[0].phone}</span>
                    <span>Email : {order.user.personalInfo[0].email}</span>
                  </div>
                  <div className="locationInfo flex flex-col gap-[0.5vh]">
                    <span>City : {order.user.personalInfo[0].city}</span>
                    <span>
                      Province : {order.user.personalInfo[0].province}
                    </span>
                    <span>Area : {order.user.personalInfo[0].area}</span>
                    <span>
                      FullAddress : {order.user.personalInfo[0].fullAddress}
                    </span>
                  </div>
                </div>
                <h4 className="text-center text-[1vw] py-[1.2vh]  bg-yellow-50">
                  Products information
                </h4>
                {order.items.map((e, id) => {
                  return (
                    <div
                      key={id}
                      className="page5-elem group flex items-start justify-between pt-[3vh] pb-[2vh] overflow-hidden border-t relative"
                    >
                      <div className="over w-full h-full absolute  top-0 bg-slate-200 -translate-y-[100%] group-hover:opacity-1 group-hover:-translate-y-0 duration-[0.2s] transition-all ease"></div>
                      <div className="w-full z-10  flex justify-center px-[1vw]  items-center  ">
                        <div className="w-[15%] h-[12rem]  p-3 ">
                          <div className=" h-full  rounded-xl ">
                            <img
                              className="h-full  object-contain"
                              src={e.item.image}
                              alt=""
                            />
                          </div>
                        </div>
                        <div className="w-[70%] h-full  px-5 py-3 ">
                          <div className=" w-full h-full flex flex-col justify-around">
                            <p className="my-[1vh] text-[0.7vw] ">
                              Order no. <span>{id + 1}</span>
                            </p>
                            <h2 className="text-[1.1vw] leading-[-.5] tracking-tighter">
                              {e.item.name}
                            </h2>
                            <h3 className="text-[0.81vw] tracking-tight">
                              {e.item.brand}
                            </h3>
                            <h3 className="text-[0.81vw] tracking-tight">
                              {e.item.category}
                            </h3>
                            <h3 className="text-[0.81vw] tracking-tight">
                              {e.item.id}
                            </h3>
                          </div>
                        </div>
                        <div className="w-[15%] h-[12rem] flex flex-col justify-between items-end">
                          <div className="text-[1.2vw]">
                            Rs. {e.item.price}/-
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </details>
          );
        })}
    </div>
  );
}

export default OrderList;
