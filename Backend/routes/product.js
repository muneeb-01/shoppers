const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/E-commerce");

const ProductModel = mongoose.Schema({
  id: {
    type: Number,
    default: 1,
  },
  name: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    default: new Date().toLocaleDateString().split("/").join("/"),
  },
  available: {
    type: Boolean,
    default: true,
  },
  description: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Product", ProductModel);
