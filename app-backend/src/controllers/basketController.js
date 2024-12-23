const basketService = require("../services/basketService");

const basketController = {
  add: async (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.user.id; // authMiddleware'den gelen user id

    if (!productId || !quantity) {
      return res.status(400).json({ message: "productId ve quantity gereklidir." });
    }

    const success = await basketService.addToBasket(userId, productId, quantity);
    if (success) {
      return res.status(200).json({ message: "Ürün sepete eklendi." });
    }

    return res.status(500).json({ message: "Sepete ürün eklenemedi." });
  },
  updateQuantity: async (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.user.id;
  
    if (!productId || !quantity) {
      return res.status(400).json({ message: "productId ve quantity gereklidir." });
    }
  
    const response = await basketService.updateQuantity(userId, productId, quantity);
  
    if (response.success) {
      return res.status(200).json({ message: response.message });
    } else {
      return res.status(400).json({ message: response.message });
    }
  },
  

  get: async (req, res) => {
    const userId = req.user.id;

    const basket = await basketService.getBasket(userId);
    if (basket) {
      return res.status(200).json(basket);
    }

    return res.status(500).json({ message: "Sepet getirilemedi." });
  },

  remove: async (req, res) => {
    const { productId } = req.body;
    const userId = req.user.id;
  
    if (!productId) {
      return res.status(400).json({ message: "productId gereklidir." });
    }
  
    const response = await basketService.removeFromBasket(userId, productId);
  
    if (response.success) {
      return res.status(200).json({ message: response.message });
    } else {
      return res.status(404).json({ message: response.message });
    }
  },
  

  clear: async (req, res) => {
    const userId = req.user.id;

    const success = await basketService.clearBasket(userId);
    if (success) {
      return res.status(200).json({ message: "Sepet temizlendi." });
    }

    return res.status(500).json({ message: "Sepet temizlenemedi." });
  },
};

module.exports = basketController;
