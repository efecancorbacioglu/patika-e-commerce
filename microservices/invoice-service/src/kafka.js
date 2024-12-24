const { Kafka } = require("kafkajs");
const Invoice = require("./models/invoiceModel");

const kafka = new Kafka({
  clientId: "invoice-service",
  brokers: ["kafka:9092"],
});

const consumer = kafka.consumer({ groupId: "invoice-group" });

const connectConsumer = async () => {
  try {
    await consumer.connect();
    console.log("Kafka consumer connected in invoice-service");
  } catch (error) {
    console.error("Error connecting Kafka consumer:", error);
  }
};

const subscribeToTopic = async (topic) => {
  try {
    await consumer.subscribe({ topic, fromBeginning: true });

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const { orderId, userId, amount, paymentStatus } = JSON.parse(
          message.value.toString()
        );

        if (paymentStatus !== "success") {
          console.log(`Payment failed for order ${orderId}. Invoice not created.`);
          return;
        }

        // Faturayı MongoDB'ye kaydet
        try {
          const invoice = new Invoice({
            orderId,
            userId,
            amount,
            invoiceNumber: `INV-${Date.now()}`,
          });

          await invoice.save();
          console.log("Invoice saved to database:", invoice);
        } catch (error) {
          console.error("Error saving invoice:", error);
        }
      },
    });
  } catch (error) {
    console.error("Error subscribing to topic:", error);
  }
};

module.exports = { connectConsumer, subscribeToTopic };
