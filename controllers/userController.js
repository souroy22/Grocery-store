const Customer = require("../models/customerModel");
const moment = require("moment");

const userController = {
  getAllCustomers: async (req, res) => {
    try {
      const customers = await Customer.find({ role: "CUSTOMER" });
      return res.status(201).json(customers);
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Server error while finding all customers" });
    }
  },
  getOrderList: async (req, res) => {
    try {
      const orderList = await Customer.findById(req.profile.id)
        .select("orderList")
        .populate("orderList");
      return res.status(201).json(orderList);
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Server error while finding all customers" });
    }
  },
  getUserDetailsithMaxOrder: async (req, res) => {
    try {
      const { customerId } = req.params;
      const YEAR_BEFORE = moment().startOf("month").format("YYYY-MM-DD hh:mm");
      const endOfMonth = moment().endOf("month").format("YYYY-MM-DD hh:mm");
      const customerDetails = await Customer.find(customerId, {
        $match: { createdAt: { $gte: YEAR_BEFORE, $lte: endOfMonth } },
      });
      return res.status(201).json(customerDetails);
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Server error while finding all customers" });
    }
  },
};

module.exports = userController;
