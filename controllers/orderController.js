const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const Customer = require("../models/customerModel");

const orderController = {
  createOrder: async (req, res) => {
    try {
      const {
        products,
        amount,
        paymentMethod,
        status = "PROCESSING",
      } = req.body;
      if (!products || !Array.isArray(products) || !products.length) {
        return res.status(400).json({ error: "Sorry, No products found!" });
      }
      let totalAmount = 0;
      for (let product of products) {
        let { productId, count } = product;
        console.log("count", count);
        if (!productId?.trim() || !Number.isInteger(count) || count <= 0) {
          return res
            .status(400)
            .json({ error: "Please provide proper details of a product" });
        }
        const isExist = await Product.findById(productId);
        if (!isExist) {
          return res
            .status(400)
            .json({ error: "No such product found from list" });
        }
        if (isExist.qty < count) {
          return res
            .status(400)
            .json({ error: "Stock is less what you had ordered" });
        }
        totalAmount += isExist.price * count;
      }
      if (totalAmount !== amount) {
        return res.status(400).json({ error: "Amount mismatched" });
      }
      let newOrder = new Order({
        products,
        amount,
        paymentMethod,
        status,
      });
      newOrder = await newOrder.save();
      await Customer.findByIdAndUpdate(req.profile.id, {
        $push: { orderList: newOrder.id },
      });
      return res.status(201).json(newOrder);
    } catch (error) {
      console.log(
        `Server error while creating an order, error -> ${error.message}`
      );
      return res
        .status(500)
        .json({ error: "Server error while creating an order" });
    }
  },
};

module.exports = orderController;
