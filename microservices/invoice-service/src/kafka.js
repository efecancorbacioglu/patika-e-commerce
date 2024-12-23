const { Kafka } = require("kafkajs");
const Invoice = require("./models/invoiceModel"); // Fatura modeli eklendi

const kafka = new Kafka({
  clientId: "invoice-service",
  brokers: ["kafka:9092"], // Kafka broker adresi
});

const consumer = kafka.consumer({ groupId: "invoice-group" });

const connectConsumer = async () => {
  try {
    await consumer.connect();
    console.log("Kafka consumer connected in invoice-service");
  } catch (error) {
    console.error("Consumer connection failed:", error);
  }
};

const subscribeToTopic = async (topic, callback) => {
  try {
    await consumer.subscribe({ topic, fromBeginning: true });

    await consumer.run({
      eachMessage: async ({ message }) => {
        console.log(`Message received from topic ${topic}:`, message.value.toString());
        const paymentInfo = JSON.parse(message.value.toString());

        // Fatura oluştur ve MongoDB'ye kaydet
        const invoice = new Invoice({
          orderId: paymentInfo.orderId || null,
          userId: paymentInfo.userId,
          amount: paymentInfo.amount,
          invoiceNumber: `INV-${Date.now()}`,
        });

        await invoice.save();
        console.log("Invoice saved to database:", invoice);

        // Gelen mesajı callback ile işleme
        callback(paymentInfo);
      },
    });
  } catch (error) {
    console.error("Error while subscribing to topic or processing messages:", error);
  }
};

module.exports = { connectConsumer, subscribeToTopic };