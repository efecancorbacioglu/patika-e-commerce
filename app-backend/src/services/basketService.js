const { redisCon } = require("../utils/redis");
const products = require("../models/productModel");

async function addToBasket(userId, productId, quantity = 1) {
  try {
    const client = await redisCon();

    const basketKey = `basket:${userId}`;
    const currentQuantity = await client.hGet(basketKey, productId);

    const newQuantity = currentQuantity
      ? parseInt(currentQuantity) + quantity
      : quantity;
    await client.hSet(basketKey, productId, newQuantity);

    console.log(`Kullanıcı ${userId} için ürün ${productId} sepete eklendi.`);
    return true;
  } catch (e) {
    console.error("Sepete ürün ekleme hatası:", e);
    return false;
  }
}
async function updateQuantity(userId, productId, quantity) {
  try {
    const client = await redisCon();
    const basketKey = `basket:${userId}`;

    const productExists = await client.hExists(basketKey, productId);

    if (!productExists) {
      console.log(
        `Kullanıcı ${userId} için ürün ${productId} sepette bulunamadı.`
      );
      return { success: false, message: "Ürün sepette bulunamadı." };
    }

    if (quantity <= 0) {
      console.log(
        `Kullanıcı ${userId} için ürün ${productId} miktarı sıfır veya negatif olamaz.`
      );
      return { success: false, message: "Miktar sıfırdan büyük olmalıdır." };
    }

    await client.hSet(basketKey, productId, quantity);
    console.log(
      `Kullanıcı ${userId} için ürün ${productId} miktarı ${quantity} olarak güncellendi.`
    );
    return { success: true, message: "Ürün miktarı güncellendi." };
  } catch (e) {
    console.error("Ürün miktarı güncelleme hatası:", e);
    return { success: false, message: "Ürün miktarı güncellenemedi." };
  }
}

async function getBasket(userId) {
  try {
    const client = await redisCon();
    const basketKey = `basket:${userId}`;

    const basket = await client.hGetAll(basketKey);

    if (!basket || Object.keys(basket).length === 0) {
      return [];
    }

    const detailedBasket = await Promise.all(
      Object.entries(basket).map(async ([productId, quantity]) => {
        const product = await products.findById(productId);
        return {
          productId,
          quantity: parseInt(quantity),
          title: product.title,
          price: product.price,
          image: product.image,
        };
      })
    );

    return detailedBasket;
  } catch (e) {
    console.error("Detaylı sepet getirilemedi:", e);
    return [];
  }
}

async function removeFromBasket(userId, productId) {
  try {
    const client = await redisCon();
    const basketKey = `basket:${userId}`;

    const productExists = await client.hExists(basketKey, productId);

    if (!productExists) {
      console.log(
        `Kullanıcı ${userId} için ürün ${productId} sepette bulunamadı.`
      );
      return { success: false, message: "Ürün sepette bulunamadı." };
    }

    await client.hDel(basketKey, productId);
    console.log(
      `Kullanıcı ${userId} için ürün ${productId} sepetten çıkarıldı.`
    );
    return { success: true, message: "Ürün sepetten çıkarıldı." };
  } catch (e) {
    console.error("Sepetten ürün çıkarma hatası:", e);
    return { success: false, message: "Sepetten ürün çıkarılamadı." };
  }
}

async function clearBasket(userId) {
  try {
    const client = await redisCon();
    const basketKey = `basket:${userId}`;

    await client.del(basketKey);
    console.log(`Kullanıcı ${userId} için sepet temizlendi.`);
    return true;
  } catch (e) {
    console.error("Sepeti temizleme hatası:", e);
    return false;
  }
}

module.exports = {
  addToBasket,
  getBasket,
  removeFromBasket,
  clearBasket,
  updateQuantity,
};
