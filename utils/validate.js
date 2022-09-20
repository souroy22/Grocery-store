const Category = require("../models/categoryModel");
const Customer = require("../models/customerModel");

const validate = {
  validateSignupData: async (name, email, password, role, phone) => {
    const error = {};
    if (!name?.trim()) {
      error.name = "Name field is required";
    }
    if (!email?.trim()) {
      error.email = "Email field is required";
    }
    if (!password?.trim()) {
      error.password = "Password field is required";
    }
    if (!role?.trim()) {
      error.role = "Role field is required";
    }
    if (!phone?.trim()) {
      error.phone = "Phone field is required";
    }
    if (Object.entries(error).length > 0) {
      throw new Error({ error, message: "Required fileld error" });
    }
    let isExist = await Customer.findOne({ email });
    if (isExist) {
      throw new Error("This mail id is already exists. Please login.");
    }
    isExist = await Customer.findOne({ phone });
    if (isExist) {
      throw new Error("This phone number is already exists. Please login.");
    }
  },
  validateloginData: async (email, password) => {
    const error = {};
    if (!email?.trim()) {
      error.email = "Email field is required";
    }
    if (!password?.trim()) {
      error.password = "Password field is required";
    }
    if (Object.entries(error).length > 0) {
      throw new Error({ error, message: "Required fileld error" });
    }
    let user = await Customer.findOne({ email });
    if (!user) {
      throw new Error("You are new here. Please signup");
    }
    return user;
  },
  validateProductData: async (name, description, qty, price, category) => {
    const error = {};
    if (!name?.trim()) {
      error.name = "Product Name field is required";
    }
    if (!description?.trim()) {
      error.description = "Description field is required";
    }
    if (!qty) {
      error.qty = "Qty field is required";
    }
    if (!price) {
      error.price = "Role field is required";
    }
    if (!category?.trim()) {
      error.category = "Category field is required";
    }
    if (Object.entries(error).length > 0) {
      throw new Error({ error, message: "Required fileld error" });
    }
    if (!Number.isInteger(qty)) {
      error.qty = "Qty value should be a number";
    }
    if (!Number.isInteger(price)) {
      error.price = "Price value should be a number";
    }
    if (Object.entries(error).length > 0) {
      throw new Error({ error, message: "Validation error" });
    }
    const isCategoryExist = await Category.findById(category);
    if (!isCategoryExist) {
      throw new Error("This category is not exists");
    }
  },
};

module.exports = validate;
