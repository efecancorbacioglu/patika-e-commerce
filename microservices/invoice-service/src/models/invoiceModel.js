const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({
  orderId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Order" },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  amount: { type: Number, required: true },
  invoiceNumber: { type: String, unique: true, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Invoice", invoiceSchema);
