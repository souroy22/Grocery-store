const express = require("express");
const authController = require("../controllers/authController");
const productController = require("../controllers/productController");
const router = express.Router();

router.post(
  "/create/:userId",
  authController.isSignedIn,
  authController.isAuthenticated,
  authController.isSeller,
  productController.createProduct
);

router.put(
  "/:productId/update/:userId",
  authController.isSignedIn,
  authController.isAuthenticated,
  authController.isSeller,
  productController.updateProduct
);

router.get("/all", productController.getAllProducts);

module.exports = router;
