const Product = require("../models/productModel");
const validate = require("../utils/validate");

const productController = {
  createProduct: async (req, res) => {
    try {
      const { name, description, qty, price, category } = req.body;
      try {
        await validate.validateProductData(
          name,
          description,
          qty,
          price,
          category
        );
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }
      let newProduct = new Product({
        name,
        description,
        qty,
        price,
        category,
        seller: req.profile.id,
      });
      newProduct = await newProduct.save();
      return res.status(201).json(newProduct);
    } catch (error) {
      console.log(`Error while creating product, error -> ${error.message}`);
      return res
        .status(500)
        .json({ error: "Server error while creating new product" });
    }
  },
  updateProduct: async (req, res) => {
    try {
      const { productId } = req.params;
      await Product.findByIdAndUpdate(productId, req.body, {
        new: true,
        returnOriginal: false,
      });
      return res.status(201).json({ msg: "Product updated successfully" });
    } catch (error) {
      console.log(`Error while updating product, error -> ${error.message}`);
      return res
        .status(500)
        .json({ error: "Server error while updating product" });
    }
  },
  getAllProducts: async (req, res) => {
    try {
      const products = await Product.find()
        .populate("category", "id name")
        .populate("seller", "id name");
      return res.status(200).json(products);
    } catch (error) {
      console.log(
        `Error while getting all products, error -> ${error.message}`
      );
      return res
        .status(500)
        .json({ error: "Server error while getting all products" });
    }
  },
};

module.exports = productController;
