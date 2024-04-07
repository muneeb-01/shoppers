const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/E-commerce");

const orderModel = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  items: [
    {
      item: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Product", // Reference to the Product model
      },
      quantity: {
        type: Number,
        required: true,
        min: 1, // Ensure at least one item per order item
      },
    },
  ],
  orderStatus: {
    type: String,
    required: true,
    default: "pending",
    enum: ["pending", "processing", "shipped", "delivered", "cancelled"], // Possible order statuses
  },
  total: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: String,
    default: new Date().toLocaleDateString().split("/").join("/"),
  },
});

module.exports = mongoose.model("order", orderModel);
