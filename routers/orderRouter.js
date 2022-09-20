const express = require("express");
const authController = require("../controllers/authController");
const orderController = require("../controllers/orderController");
const router = express.Router();

router.post(
  "/create/:userId",
  authController.isSignedIn,
  authController.isAuthenticated,
  orderController.createOrder
);

module.exports = router;
