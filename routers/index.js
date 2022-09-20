const express = require("express");
const router = express.Router();

const authRouters = require("./authRouter");
const orderRouters = require("./orderRouter");
const productRouters = require("./productRouter");
const userRouters = require("./userRouter");
const categoryRouters = require("./categoryRouter");

router.use("/auth", authRouters);
router.use("/order", orderRouters);
router.use("/product", productRouters);
router.use("/user", userRouters);
router.use("/category", categoryRouters);
router.use("/order", orderRouters);

module.exports = router;
