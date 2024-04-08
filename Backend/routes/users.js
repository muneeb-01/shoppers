const mongoose = require("mongoose");
const plm = require("passport-local-mongoose");
mongoose.connect("mongodb://localhost:27017/E-commerce");

const UserModel = mongoose.Schema({
  username: String,
  email: String,
  password: String,
  date: {
    type: String,
    default: new Date().toLocaleDateString().split("/").join("/"),
  },
  profile: {
    type: String,
  },
  cart: {
    type: [
      {
        item: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],
    default: [],
  },
  personalInfo: {
    type: [
      {
        name: {
          type: String,
        },
        surname: {
          type: String,
        },
        email: {
          type: String,
          unique: true,
        },
        phone: {
          type: String,
        },
        province: {
          type: String,
        },
        city: {
          type: String,
        },
        area: {
          type: String,
        },
        fullAddress: {
          type: String,
        },
      },
    ],
    default: [],
  },
  orderHistory: {
    type: [
      {
        date: {
          type: String,
          default: new Date().toLocaleDateString().split("/").join("/"),
        },
        order: { type: mongoose.Schema.Types.ObjectId, ref: "order" },
      },
    ],
    default: [],
  },
});

UserModel.plugin(plm);

module.exports = mongoose.model("User", UserModel);
