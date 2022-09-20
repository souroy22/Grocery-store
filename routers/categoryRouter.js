const express = require("express");
const authController = require("../controllers/authController");
const categoryController = require("../controllers/categoryController");
const router = express.Router();

router.post(
  "/create/:userId",
  authController.isSignedIn,
  authController.isAuthenticated,
  authController.isSeller,
  categoryController.createACategory
);

router.get("/all", categoryController.getAllCategories);

module.exports = router;
