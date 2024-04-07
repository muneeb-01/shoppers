import React, { useEffect, useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { LuMinus, LuPlus } from "react-icons/lu";
function ProdductList() {
  const [all_Products, Setall_Products] = useState([]);

  const fetching = async () => {
    await fetch("http://localhost:3000/allProducts")
      .then((res) => res.json())
      .then((data) => {
        Setall_Products(data);
      });
  };
  useEffect(() => {
    fetching();
  }, []);

  const handleDelete = async (id) => {
    await fetch("http://localhost:3000/deletepost", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });
    await fetching();
  };
  return (
    <div className=" w-full mt-[14vh] px-24 py-10 flex flex-col justify-center items-start">
      <h5 className="w-full my-4 text-[2.8rem] inline text-center">
        All Product List{" "}
      </h5>
      <div className="w-full  flex flex-col">
        {all_Products.map((e, id) => {
          return (
            <div
              key={id}
              className="w-full h-full flex justify-center p-6 items-center border-y-2 border-[#ddd8d8]"
            >
              <div className="w-[15%] h-[12rem]  p-3 ">
                <div className=" w-full h-full rounded-xl ">
                  <img
                    className="h-full  object-contain"
                    src={e.image}
                    alt=""
                  />
                </div>
              </div>
              <div className="w-[70%] h-[8rem] px-5 py-3 ">
                <div className=" w-full h-full flex flex-col justify-between ">
                  <h2 className="text-[1.7rem]   tracking-tighter">{e.name}</h2>
                  <h3 className="text-[1rem] tracking-tight">{e.brand}</h3>
                  <p className="text-[0.9rem]  tracking-tight">
                    {e.description.slice(0, 100)}
                  </p>
                </div>
              </div>
              <div className="w-[15%] h-[12rem] flex flex-col justify-between items-end">
                <div className="">
                  <button
                    onClick={() => handleDelete(e.id)}
                    className="flex w-min px-3 text-nowrap py-1  tracking-tighter rounded-sm  items-center justify-center  gap-2 text-[0.9rem] border border-slate-300 "
                  >
                    <FaRegTrashCan /> Remove Item
                  </button>
                </div>
                <div className="text-2xl">Rs. {e.price}/-</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProdductList;
