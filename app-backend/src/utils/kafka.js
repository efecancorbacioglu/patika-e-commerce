const { Kafka, Partitioners } = require('kafkajs');
const orderService = require('../services/orderService');

// Kafka bağlantısı
const kafka = new Kafka({
  clientId: 'e-ticaret-app',
  brokers: ['kafka:9092'], // Kafka broker adresi
});

const consumer = kafka.consumer({ groupId: "order-group" });
const producer = kafka.producer({
  createPartitioner: Partitioners.LegacyPartitioner,
});

const sendMessage = async (topic, message) => {
  try {
    await producer.connect();

    await producer.send({
      topic,
      messages: [{ value: JSON.stringify(message) }],
    });
    console.log(`Message sent to topic ${topic}:`, message);
    await producer.disconnect();
  } catch (error) {
    console.error(`Error sending message to topic ${topic}:`, error);
  }
};

const consumeMessages = async () => {
  await consumer.connect();

  await consumer.subscribe({ topic: "order-topic", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const { orderId, paymentStatus } = JSON.parse(message.value.toString());

      console.log("Payment status update received:", { orderId, paymentStatus });

      try {
        // Siparişin ödeme durumunu güncelle
        await orderService.updateOrderStatus(orderId, paymentStatus);
        console.log(`Order ${orderId} updated to ${paymentStatus}.`);
      } catch (error) {
        console.error("Error updating order status:", error);
      }
    },
  });
};

module.exports = { consumeMessages, sendMessage };
