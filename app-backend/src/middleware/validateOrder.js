const mongoose = require("mongoose");

function validateOrder(req, res, next) {
  const { products } = req.body;

  if (!products || !Array.isArray(products)) {
    return res.status(400).json({
      message: "Ürünler listesi geçerli bir dizi olmalıdır.",
    });
  }

  for (const product of products) {
    if (!mongoose.Types.ObjectId.isValid(product.productId)) {
      return res.status(400).json({
        message: `Geçersiz ürün ID'si: ${product.productId}`,
      });
    }
  }

  next();
}

module.exports = validateOrder;
