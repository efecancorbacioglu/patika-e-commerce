const orderService = require("../services/orderService");
const { sendMessage } = require("../utils/kafka");

const orderController = {
  create: async (req, res) => {
    const { userId, products, totalAmount } = req.body;

    console.log("Create Order Controller:", { userId, products, totalAmount });

    if (!userId || !products || !totalAmount) {
      return res.status(400).json({ message: "Tüm alanlar gereklidir." });
    }

    try {
      const newOrder = await orderService.createOrder({ userId, products, totalAmount });

      if (!newOrder) {
        return res.status(500).json({ message: "Sipariş oluşturulamadı." });
      }

      await sendMessage("payment-request", {
        orderId: newOrder._id, 
        userId,
        products,
        amount: totalAmount,
      });

      res.status(200).json({ message: "Payment request sent successfully.", orderId: newOrder._id });
    } catch (error) {
      console.error("Error sending payment request:", error);
      res.status(500).json({ message: "Payment request failed." });
    }
  },
};

module.exports = orderController;
