const express = require("express");
const authRouter = require("./authRoutes");
const userRouter = require("./userRoutes");
const productRouter = require("./productRoutes");
const orderRouter = require("./orderRoutes");
const basketRouter = require("./basketRoutes");

const router = express.Router();
router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/product", productRouter);
router.use("/orders", orderRouter);
router.use('/basket', basketRouter);
module.exports = router;
