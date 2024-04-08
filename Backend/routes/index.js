var express = require("express");
const upload = require("./multer");
var router = express.Router();
const ProductModel = require("./product");
const userModel = require("./users");
const passport = require("passport");
const localStrategy = require("passport-local");
passport.use(new localStrategy(userModel.authenticate()));
const jwt = require("jsonwebtoken");
const orderModel = require("./Orders");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("index");
});

// Add Delete Products from database
router.post("/addProduct", async (req, res) => {
  const allProducts = await ProductModel.find({});
  let id;
  if (allProducts.length > 0) {
    let lastProduct_id = allProducts.slice(-1)[0].id;
    id = lastProduct_id ? lastProduct_id + 1 : 1;
  }
  const product = await ProductModel.create({
    id: id,
    name: req.body.name,
    image: req.body.image,
    brand: req.body.brand,
    category: req.body.category,
    price: req.body.price,
    description: req.body.description,
  });
  res.json({
    success: 1,
    id: id,
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    price: req.body.price,
    description: req.body.description,
  });
});

router.post("/deletepost", async (req, res) => {
  const product = await ProductModel.findOneAndDelete({ id: req.body.id });
  res.json({
    name: req.body.name,
  });
});

router.get("/allProducts", async (req, res) => {
  const products = await ProductModel.find({});
  res.send(products);
});

router.get("/allProducts/:productId", async (req, res) => {
  const { productId } = req.params;
  try {
    const singleProduct = await ProductModel.findOne({ id: productId });
    if (!singleProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.json(singleProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

//new collection
router.get("/newCollection", async (req, res) => {
  const allProducts = await ProductModel.find();
  const newCollection = allProducts.slice(0).slice(-4);
  res.send(newCollection);
});

// add to cart
router.post("/cart/add", async (req, res) => {
  const { item, quantity, userId } = req.body;
  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    const existingItem =
      user.cart.length > 0 &&
      user.cart.find((items) => items.item.toString() === item);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      user.cart.push({ item, quantity });
    }
    await user.save();
    res.json({ message: "Added to cart", existingItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
router.get("/cart/get", async (req, res) => {
  try {
    const user = await userModel.find().populate("cart.item");
    res.send({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/cartItems", async (req, res) => {
  try {
    const user = await userModel
      .findById(req.body.userId)
      .populate("cart.item")
      .populate("orderHistory.order")
      .populate({
        path: "orderHistory.order",
        populate: { path: "items.item" },
      });

    res.send({ cartItem: user.cart, orderHistory: user.orderHistory });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/cart/delete", async (req, res) => {
  const { productId, userId } = req.body;

  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const updatedCart = user.cart.filter(
      (item) => item.item.toString() !== productId
    );
    user.cart = updatedCart;
    await user.save();

    res.json({ success: true, updatedCart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
router.post("/cart/handleQuantity", async (req, res) => {
  const { qty, id, userId } = req.body;
  const user = await userModel.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const index = user.cart.findIndex((e) => {
    return e.item.toString() == id;
  });
  if (user.cart[index].quantity > 1 && qty == -1) {
    user.cart[index].quantity += qty;
  } else if (user.cart[index].quantity >= 1 && qty == 1) {
    user.cart[index].quantity += qty;
  }
  await user.save();
  res.send(user.cart);
});

router.use("/images", express.static("./public/uploads/images"));

router.post("/upload", upload.single("product"), (req, res) => {
  res.json({
    success: 1,
    img_url: `http://localhost:3000/images/${req.file.filename}`,
  });
});

//User Authentication and Authorizarion

router.post("/register", async (req, res) => {
  try {
    // Check for existing user
    let check = await userModel.findOne({
      username: req.body.username,
      email: req.body.email,
    });
    if (check) {
      return res.status(400).json({
        success: false,
        error: "existing user found with same username",
      });
    }

    // Create user data
    const userData = new userModel({
      username: req.body.username,
      email: req.body.email,
    });

    // Register user and handle potential errors
    userModel
      .register(userData, req.body.password)
      .then(function (registeredUser) {
        passport.authenticate("local")(req, res, async function (err) {
          if (err) {
            return res
              .status(500)
              .json({ success: false, error: "Registration failed" });
          }
          const user = await userModel.findOne({ username: req.body.username });
          const data = {
            user: { id: user.id },
          };
          const token = jwt.sign(data, "secret_ecom");
          return res.json({ success: true, token, user: user._id });
        });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ success: false, error: "Registration failed" });
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await userModel.findOne({
      username: req.body.username,
    });

    if (!user) {
      return res
        .status(401)
        .json({ success: false, error: "Invalid username/email or password" });
    }

    // Validate password (likely using Passport's "local" strategy)
    const isValid = await user.authenticate(req.body.password);

    if (!isValid) {
      return res
        .status(401)
        .json({ success: false, error: "Invalid username/email or password" });
    }
    // Login successful (use Passport to authenticate)
    passport.authenticate("local")(req, res, function () {
      const data = {
        user: { id: user.id },
      };
      const token = jwt.sign(data, "secret_ecom");
      res.json({
        success: true,
        token: token,
        user: user._id,
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

// user profile, location and personal information

router.post("/uploadProfile", upload.single("profile"), (req, res) => {
  res.json({
    success: 1,
    img_url: `http://localhost:3000/images/${req.file.filename}`,
  });
});

router.post("/userinfo", async (req, res) => {
  const {
    userId,
    name,
    surname,
    email,
    phone,
    province,
    city,
    area,
    fullAddress,
    profile,
  } = req.body;
  const user = await userModel.findById(userId);
  console.log(user);
  user.personalInfo[0] = {
    name,
    surname,
    email,
    phone,
    province,
    city,
    area,
    fullAddress,
  };
  user.email = email;
  user.profile = profile;
  await user.save();
  res.send({
    message: "Successfully Changed",
    userInfo: {
      profile: user.profile,
      info: user.personalInfo,
      username: user.username,
    },
  });
});

router.post("/userProfileInfo", async (req, res) => {
  const { userId } = req.body;
  console.log(userId);
  const user = await userModel.findById(userId);
  res.send({
    success: true,
    userInfo: {
      profile: user.profile,
      info: user.personalInfo,
      username: user.username,
    },
  });
});

router.post("/setUsername", async (req, res) => {
  const { userId, username } = req.body;
  const isUser = await userModel.findOne({ username: username });
  if (isUser) {
    res
      .status(200)
      .send({ success: false, message: "Username already in use" });
    return;
  }
  const user = await userModel.findById(userId);
  user.username = username;
  await user.save();

  res.send({
    success: true,
    username: user.username,
  });
});

//OrderHandler

router.post("/addNewOrder", async (req, res) => {
  const { userId, total, items } = req.body;
  const user = await userModel.findById(userId);
  const addOrder = await orderModel.create({
    user: userId,
    items: items,
    total: total,
  });
  user.cart = [];
  user.orderHistory.push({ order: addOrder.id });
  await user.save();
  const userOrder = await userModel
    .findById(userId)
    .populate("orderHistory.order")
    .populate({
      path: "orderHistory.order",
      populate: { path: "items.item" },
    });

  res.send({
    success: true,
    cart: user.cart,
    orderHistory: userOrder.orderHistory,
  });
});

router.get("/allOrder", async (req, res) => {
  const allOrders = await orderModel
    .find()
    .populate("user")
    .populate("items.item");

  res.send({
    allOrders,
  });
});

router.post("/deleteOrderHistory", async (req, res) => {
  const { userId, orderId } = req.body;
  const user = await userModel.findById(userId);
  const updatedOrderHistory = user.orderHistory.filter(
    (e) => e._id.toString() !== orderId
  );
  user.orderHistory = updatedOrderHistory;
  user.save();
  res.send({
    success: true,
    orderHistory: user.orderHistory,
  });
});

router.post("/updateOrderStatus", async (req, res) => {
  const { orderId, status } = req.body;
  const order = await orderModel.findById(orderId);
  order.orderStatus = status;
  await order.save();
  res.send({
    success: true,
    order,
  });
});

module.exports = router;
