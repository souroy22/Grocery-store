const Customer = require("../models/customerModel");
const { hashPassword, comparePassword } = require("../utils/helper");
const { validateloginData, validateSignupData } = require("../utils/validate");
const jwt = require("jsonwebtoken");
const { expressjwt } = require("express-jwt");

const authController = {
  signup: async (req, res) => {
    try {
      const { name, email, password, phone, role } = req.body;
      try {
        await validateSignupData(name, email, password, phone, role);
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }
      const hashedPassword = await hashPassword(password);
      let newCustomer = new Customer({
        name,
        email,
        password: hashedPassword,
        phone,
        role,
      });
      newCustomer = await newCustomer.save();
      return res.status(200).json({ msg: "Signup successfull", newCustomer });
    } catch (error) {
      console.log(`Error while signup. Error -> ${error.message}`);
      return res.status(500).json({ error: "Server error while signup" });
    }
  },
  signin: async (req, res) => {
    try {
      const { email, password } = req.body;
      let user;
      try {
        user = await validateloginData(email, password);
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }
      const matched = await comparePassword(password, user.password);
      if (!matched) {
        return res
          .status(401)
          .json({ error: "email or password doesn't match" });
      }

      const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
        expiresIn: "12h",
      });

      res.cookie("token", token, {
        expire: new Date() + 60 * 60 * 24 * 30,
      });

      return res.status(200).json({
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        token,
        id: user.id,
      });
    } catch (error) {
      console.log(`Error while login. Error -> ${error.message}`);
      return res.status(500).json({ error: "Server error while login" });
    }
  },
  isSignedIn: expressjwt({
    secret: process.env.SECRET_KEY,
    algorithms: ["HS256"],
    userProperty: "auth",
  }),

  isAdmin: (req, res, next) => {
    if (req.profile.role !== "ADMIN") {
      return res
        .status(403)
        .json({ error: "You are not Admin, Access Denied!" });
    }
    next();
  },
  isAuthenticated: async (req, res, next) => {
    const { userId } = req.params;
    const profile = await Customer.findById(userId);
    req.profile = profile;
    if (!profile) {
      return res.status(403).json({ error: "User not found" });
    }
    next();
  },
  isSeller: async (req, res, next) => {
    if (req.profile.role !== "SELLER") {
      return res
        .status(403)
        .json({ error: "You are not Seller, Access Denied!" });
    }
    next();
  },
};

module.exports = authController;
