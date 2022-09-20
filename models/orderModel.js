const mongoose = require("mongoose");

const purchesProductSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  count: { type: Number, required: true },
});

const orderSchema = new mongoose.Schema(
  {
    products: {
      type: [purchesProductSchema],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ["CASH", "CARD", "UPI"],
      required: true,
    },
    status: {
      type: String,
      enum: [
        "PROCESSING",
        "SHIPPED",
        "OUT_FOR_DELIVERY",
        "DELIVERED",
        "CANCELLED",
        "RETURNED",
      ],
      required: true,
      default: "PROCESSING",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);
