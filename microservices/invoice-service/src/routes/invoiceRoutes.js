const express = require("express");
const Invoice = require("../models/invoiceModel");

const router = express.Router();

router.get("/getAll", async (req, res) => {
  try {
    const invoices = await Invoice.find();
    res.status(200).json({ success: true, data: invoices });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Faturalar alınamadı" });
  }
});

module.exports = router;
