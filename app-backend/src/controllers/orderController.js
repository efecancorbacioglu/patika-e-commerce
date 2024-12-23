const orderService = require("../services/orderService");
const sendMessage = require("../utils/kafka"); // Kafka producer eklendi

const orderController = {
  // Sipariş oluşturma
  create: async (req, res) => {
    const { userId, products, totalAmount } = req.body;

    if (!userId || !products || !totalAmount) {
      return res.status(400).json({ message: "Tüm alanlar gereklidir." });
    }

    try {
      const newOrder = await orderService.createOrder(req.body);
      if (!newOrder) {
        return res.status(500).json({ message: "Sipariş oluşturulamadı." });
      }

      // Payment-service'e Kafka mesajı gönder
      await sendMessage("payment-request", {
        orderId: newOrder._id,
        userId,
        amount: totalAmount,
        status: "pending",
      });

      res.status(201).json(newOrder);
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Sunucu hatası." });
    }
  },

  // Tüm siparişleri getir
  getAll: async (req, res) => {
    try {
      const orders = await orderService.getAllOrders();
      res.status(200).json(orders);
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Siparişler getirilemedi." });
    }
  },

  // Tek bir siparişi getir
  getSingle: async (req, res) => {
    try {
      const { id } = req.params;
      const order = await orderService.getOrderById(id);

      if (!order) {
        return res.status(404).json({
          success: false,
          message: "Order not found",
        });
      }

      return res.status(200).json({
        success: true,
        data: order,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },

  // Sipariş sil
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedOrder = await orderService.deleteOrder(id);

      if (!deletedOrder) {
        return res.status(404).json({
          success: false,
          message: "Order not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Order deleted successfully",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },
};

module.exports = orderController;