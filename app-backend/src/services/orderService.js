const mongooseOrder = require("../models/orderModel");

async function createOrder(params) {
  const { userId, products, totalAmount } = params;

  try {
    const newOrder = new mongooseOrder({
      userId,
      products,
      totalAmount,
    });
    await newOrder.save();
    console.log("Yeni sipariş oluşturuldu:", newOrder);
    return newOrder;
  } catch (e) { 
    console.error("Sipariş oluşturma hatası:", e);
    return false;
  }
}

async function getAllOrders() {
  try {
    const orders = await mongooseOrder.find().populate("userId products.productId");
    return orders;
  } catch (e) {
    console.error("Siparişleri getirirken hata oluştu:", e);
    return false;
  }
}

async function getOrderById(orderId) {
  try {
    const order = await mongooseOrder.findById(orderId).populate("userId products.productId");
    return order;
  } catch (e) {
    console.error("Order fetch error:", e);
    return null;
  }
}


async function deleteOrder(orderId) {
  try {
    const deletedOrder = await mongooseOrder.findByIdAndDelete(orderId);
    return deletedOrder;
  } catch (e) {
    console.error("Sipariş silme hatası:", e);
    return false;
  }
}

async function updateOrderStatus(orderId, paymentStatus) {
  try {
    const updatedOrder = await mongooseOrder.findByIdAndUpdate(
      orderId,
      { paymentStatus },
      { new: true }
    );
    return updatedOrder;
  } catch (e) {
    console.error("Order status update error:", e);
    throw new Error("Order status update failed.");
  }
}


module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  deleteOrder,
  updateOrderStatus
};
