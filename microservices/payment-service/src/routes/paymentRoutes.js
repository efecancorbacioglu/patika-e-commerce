const express = require("express");
const Payment = require("../models/paymentModel");

const router = express.Router();

router.get("/getAll", async (req, res) => {
  try {
    const payments = await Payment.find();
    res.status(200).json({ success: true, data: payments });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Ödemeler alınamadı" });
  }
});

module.exports = router;
