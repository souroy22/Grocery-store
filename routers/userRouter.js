const express = require("express");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const router = express.Router();

router.get(
  "/:userId/getAllCustomers",
  authController.isSignedIn,
  authController.isAuthenticated,
  authController.isAdmin,
  userController.getAllCustomers
);

router.get(
  "/:userId/orderList",
  authController.isSignedIn,
  authController.isAuthenticated,
  userController.getOrderList
);

router.get(
  "/:userId/:customerId/maxOrder",
  authController.isSignedIn,
  authController.isAuthenticated,
  authController.isAdmin,
  userController.getUserDetailsithMaxOrder
);

module.exports = router;
