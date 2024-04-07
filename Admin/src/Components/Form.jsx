import React, { useState } from "react";

function Form() {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const handleForm = async (e) => {
    e.preventDefault();
    let imgUrl;
    let form = e.target;
    let formData = new FormData(form);

    let productData = new FormData();
    productData.append("product", image);

    await fetch(`http://localhost:3000/upload`, {
      method: "post",
      headers: {
        Accept: "application/json",
      },
      body: productData,
    })
      .then((res) => res.json())
      .then((data) => (imgUrl = data));

    if (imgUrl.success) {
      formData.append("image", imgUrl.img_url);
      let formObj = Object.fromEntries(formData.entries()); //to convert the data what you have in form data after getting image url from backend
      await fetch(`http://localhost:3000/addProduct`, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formObj),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          data.success ? alert("Product Added") : alert("Failed");
        });
    }
  };

  return (
    <div className="w-full mt-[14vh]  p-4">
      <h5 className="w-full  my-[2vh] text-[2.8rem]  text-center">
        Add Product{" "}
      </h5>
      <form onSubmit={handleForm} action="" className="w-full  px-[8vw]">
        <div className="mb-10">
          <p className="text-xl mb-4">Product title</p>
          <input
            required
            className="focus:outline-none w-full text-[1rem] py-2 px-4 border border-[#5d5d5d]"
            type="text"
            name="name"
            placeholder="Type here"
          />
        </div>
        <div className="mb-8 w-full">
          <p className="text-xl mb-4">Description</p>
          <textarea
            placeholder="Add Description"
            required
            className="focus:outline-none w-full text-[1rem] py-2 px-4 border border-[#5d5d5d]"
            name="description"
            cols="30"
            rows="5"
          ></textarea>
        </div>
        <div className="flex gap-5 mb-8 w-full">
          <div className="w-[40%]">
            <p className="text-xl mb-4">Add Price</p>
            <input
              required
              className="focus:outline-none w-full text-[1rem] py-2 px-4 border border-[#5d5d5d]"
              type="text"
              name="price"
              placeholder="Type here"
            />
          </div>

          <div className="w-[40%]">
            <p className="text-xl mb-4">Brand</p>
            <input
              required
              className="focus:outline-none w-full text-[1rem] py-2 px-4 border border-[#5d5d5d]"
              type="text"
              name="brand"
              placeholder="Type here"
            />
          </div>

          <div>
            <p className="text-xl mb-4">Category</p>
            <select
              className="focus:outline-none text-[1rem] py-2 px-10 border border-[#5d5d5d]"
              name="category"
            >
              <option value="women">Women</option>
              <option value="kid">Kid</option>
              <option value="men">Men</option>
            </select>
          </div>
        </div>
        <div className="mb-3">
          <p className="text-xl mb-4">Add Image</p>
          <input
            className={`${image === null ? "block" : "hidden"}`}
            onChange={imageHandler}
            required
            type="file"
            // name="product"
            id="file-input"
          />
          <label htmlFor="file-input">
            <img
              src={
                image !== null ? URL.createObjectURL(image) : "/Assets/img.png"
              }
              className={`size-[10vw] object-contain ${
                image === null ? "hidden" : "block"
              }`}
              alt=""
            />
          </label>
        </div>
        <button className="px-8 py-2 mt-4 rounded-lg text-[1.17rem] text-[#EB423F] hover:text-black active:scale-95 font-medium  border border-gray-400 hover:bg-[#EBA72E] focus:outline-none">
          Add
        </button>
      </form>
    </div>
  );
}

export default Form;
