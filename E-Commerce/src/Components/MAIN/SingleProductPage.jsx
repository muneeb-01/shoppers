import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { bagItemsAction } from "../../Store/BagItemsSlice";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import FeaturedProducts from "../HOME/FeaturedProducts";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const page = () => {
  const { itemId } = useParams();
  const [product, setproduct] = useState(null);
  useEffect(() => {
    const fetchdata = async () => {
      await fetch(`http://localhost:3000/allProducts/${itemId}`)
        .then((res) => res.json())
        .then((data) => setproduct(data));
    };
    fetchdata();
    return () => {};
  }, [itemId]);

  const dispatch = useDispatch();
  const [Description, setDescription] = useState(true);
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
      {product && (
        <div className="p-20 ">
          <div id="container" className="flex pt-10 max-lg:flex-col max-sm:p-4">
            <div className="w-[36vw] max-lg:w-[100%]">
              <div id="p-l-img-con">
                <img
                  src={product.image}
                  className="w-[100%] object-contain"
                ></img>
              </div>
              <div id="p-s-img-con" className="flex gap-5 items-center">
                <div className="w-[24%]">
                  <img
                    src="/Assets/products/f1.jpg"
                    className="w-[100%] mt-[5%] object-contain"
                  ></img>
                </div>
                <div className="w-[24%]">
                  <img
                    src="/Assets/products/f2.jpg"
                    className="w-[100%] mt-[5%] object-contain"
                  ></img>
                </div>
                <div className="w-[24%]">
                  <img
                    src="/Assets/products/f3.jpg"
                    className="w-[100%] mt-[5%] object-contain"
                  ></img>
                </div>
                <div className="w-[24%]">
                  <img
                    src="/Assets/products/f4.jpg"
                    className="w-[100%] mt-[5%] object-contain"
                  ></img>
                </div>
              </div>
            </div>
            <div
              id="p-text-con"
              className="w-[50vw] p-20 max-lg:w-[100%] max-sm:p-4"
            >
              <h6 className="max-xl:text-sm flex items-center justify-start pb-6 font-md max-sm:text-[8px]] max-[850px]:text-[10px] text-wrap">
                <Link to="/">Home</Link> <IoIosArrowForward />{" "}
                <Link to="/">Shop</Link>
                <IoIosArrowForward /> {product.brand} <IoIosArrowForward />{" "}
                {product.name} <IoIosArrowForward /> {product.id}
              </h6>
              <h4 className="text-4xl font-semibold mb-[5%] max-lg:text-4xl max-sm:text-3xl max-[850px]:text-2xl">
                {product.name}
              </h4>
              <h1 className="text-5xl font-semibold mt-3 mb-3 max-lg:text-4xl max-xl:text-5xl max-sm:text-[20px] max-[850px]:text-3xl">
                ${product.price}
              </h1>
              <h4 className="text-2xl mt-[6%] font-semibold max-lg:text-2xl max-sm:text-xl max-[850px]:text-lg">
                Select Size
              </h4>
              <div className="flex items-center gap-5">
                {["S", "M", "L", "XL", "XXl"].map((item, id) => {
                  return (
                    <button
                      key={id}
                      className="bg-[transparent] border-black border-2 max-xl:text-xl max-sm:text-sm max-sm:mb-4 text-xl px-[18px] py-[10px] max-sm:py-2  rounded-[2px]  font-medium hover:bg-[#B52131] mt-5 hover:text-[#fff] hover:border-[#fff] transition ease duration-150"
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
              <button
                onClick={() => handleAddToBag(product)}
                className="bg-[transparent] border-black border-2 max-xl:text-xl max-sm:text-sm max-sm:mb-4 text-xl py-[8px] max-sm:py-2 px-[32px] rounded-[2px]  font-medium hover:bg-[#088178] mt-5 hover:text-[#fff] hover:border-[#fff] transition ease duration-150"
              >
                Add to Cart
              </button>
              <h4 className="text-4xl mt-[6%] font-semibold max-lg:text-4xl max-sm:text-3xl max-[850px]:text-2xl">
                Product Detail
              </h4>
              <p className="text-2xl pb-1 font-md max-sm:text-lg">
                They are typically made of cotton textile in a stockinette or
                jersey knit, which has a distinctively pliable texture compared
                to shirts made of woven cloth. Some modern versions have a body
                made from a continuously knitted tube, produced on a circular
                knitting machine, such that the torso has no side seams.
              </p>
            </div>
          </div>
          <section className="my-10">
            <div className="flex gap-5 items-center">
              <button
                onClick={() => {
                  setDescription(true);
                }}
                className={`
                  ${
                    Description === true
                      ? "bg-[#088178] text-white"
                      : "bg - [transparent]"
                  }  border-black border-2 max-xl:text-xl max-sm:text-sm max-sm:mb-4 text-xl px-[18px] py-[10px] max-sm:py-2  rounded-[2px]  font-medium hover:bg-[#088178] mt-5 hover:text-[#fff] hover:border-[#fff] transition ease-all duration-250`}
              >
                Description
              </button>
              <button
                onClick={() => {
                  setDescription(false);
                }}
                className={`
                  ${
                    Description === false
                      ? "bg-[#088178] text-white"
                      : "bg - [transparent]"
                  }  border-black border-2 max-xl:text-xl max-sm:text-sm max-sm:mb-4 text-xl px-[18px] py-[10px] max-sm:py-2  rounded-[2px]  font-medium hover:bg-[#088178] mt-5 hover:text-[#fff] hover:border-[#fff] transition ease-all duration-250`}
              >
                Reviews
              </button>
            </div>
            <div>
              {Description === true ? (
                <div className="border border-[#e0dddd] mt-4 px-[4vw] py-[2vw]">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Veritatis minus quibusdam ea aliquid aperiam, excepturi,
                  ipsam, natus harum praesentium quo fugiat magnam cum vitae
                  itaque odit voluptas assumenda? Cum, ducimus? Lorem ipsum,
                  dolor sit amet consectetur adipisicing elit. Omnis nam iusto
                  rerum, quae minus eaque fuga repudiandae, nostrum vero
                  consequatur magnam perferendis, odit nesciunt voluptas optio.
                  Soluta esse est ad. Rerum eum, quisquam ut eos quasi suscipit
                  vero voluptatem deleniti provident itaque fugiat ipsum
                  maiores. Suscipit, explicabo incidunt eos voluptatem inventore
                  vitae, cupiditate maiores dicta est nihil aliquid architecto
                  minus! Quasi perferendis fuga natus dicta adipisci non itaque
                  libero vero, magni dolore a soluta cumque at officia. Dolore
                  sequi quod ducimus, hic velit adipisci in, repellendus
                  expedita quo sed odit.
                </div>
              ) : (
                <div className="border border-[#e0dddd] mt-4 px-[4vw] py-[2vw]">
                  <div className="border-y-2 border-[#ebe5e5] py-4 px-5">
                    <div className="flex justify-between items-center mb-4">
                      <p className=" inline-block font-semibold">Name</p>
                      <p className=" inline-block font-semibold">3 weeks ago</p>
                    </div>
                    <div className="mb-4">
                      <h5 className="text-lg">
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Iure consectetur dolore temporibus totam maxime,
                        ex officiis! Illum laudantium, optio, minima consequatur
                        id at, itaque asperiores dignissimos neque repudiandae
                        facilis temporibus?
                      </h5>
                    </div>
                    <div>
                      <p className="flex items-center font-medium">
                        <Link to="/">Home</Link> <IoIosArrowForward />{" "}
                        <Link to="/">Shop</Link>
                        <IoIosArrowForward /> {product.brand}{" "}
                        <IoIosArrowForward /> {product.name}{" "}
                        <IoIosArrowForward /> {product.id}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2 justify-center items-center">
                    <button className="bg-[transparent] border-black border-2 max-xl:text-xl max-sm:text-sm max-sm:mb-4 text-xl px-[18px] py-[10px] max-sm:py-2  rounded-[2px]  font-medium hover:bg-[#B52131] mt-5 hover:text-[#fff] hover:border-[#fff] transition ease duration-150">
                      <MdKeyboardArrowLeft />
                    </button>
                    <button className="border-black  max-xl:text-xl max-sm:text-sm max-sm:mb-4 text-xl px-[18px] py-[10px] max-sm:py-2  rounded-[2px]  font-medium bg-[#088178] mt-5 text-[#fff] hover:border-[#fff] ">
                      1
                    </button>
                    <button className="bg-[transparent] border-black border-2 max-xl:text-xl max-sm:text-sm max-sm:mb-4 text-xl px-[18px] py-[10px] max-sm:py-2  rounded-[2px]  font-medium hover:bg-[#B52131] mt-5 hover:text-[#fff] hover:border-[#fff] transition ease duration-150">
                      <MdKeyboardArrowRight />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </section>
          <FeaturedProducts />
        </div>
      )}
    </>
  );
};

export default page;
