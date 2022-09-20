const Category = require("../models/categoryModel");

const categoryController = {
  createACategory: async (req, res) => {
    try {
      const { name } = req.body;
      if (!name?.trim()) {
        return res.status(400).json({ error: "Name field is required" });
      }
      const isExist = await Category.findOne({ name });
      if (isExist) {
        return res.status(400).json({ error: "Duplicate category" });
      }
      let newCategory = new Category({ name });
      newCategory = await newCategory.save();
      return res.status(200).json(newCategory);
    } catch (error) {
      console.log(
        `Server error while creating a category, error -> ${error.message}`
      );
      return res
        .status(500)
        .json({ error: "Server error while creating a category" });
    }
  },
  getAllCategories: async (req, res) => {
    try {
      const categories = await Category.find();
      return res.status(201).json(categories);
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Server error while getting all categories" });
    }
  },
};

module.exports = categoryController;
