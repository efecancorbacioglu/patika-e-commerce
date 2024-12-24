const { Kafka } = require("kafkajs");
const Payment = require("./models/paymentModel");

const kafka = new Kafka({
  clientId: "payment-service",
  brokers: ["kafka:9092"],
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: "payment-group" });

const sendMessage = async (topic, message) => {
  try {
    await producer.send({
      topic,
      messages: [{ value: JSON.stringify(message) }],
    });
    console.log(`Message sent to topic ${topic}:`, message);
  } catch (error) {
    console.error("Error while sending Kafka message:", error);
  }
};

const consumeMessages = async () => {
  try {
    await consumer.connect();
    await consumer.subscribe({ topic: "payment-request", fromBeginning: true });

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const { orderId, userId, amount } = JSON.parse(message.value.toString());


        const paymentStatus = "success";

        try {
          const paymentRecord = new Payment({
            userId,
            amount,
            status: paymentStatus,
          });
          await paymentRecord.save();

          await sendMessage("order-topic", { orderId, paymentStatus });
          await sendMessage("invoice-topic", { orderId, userId, amount, paymentStatus });

        } catch (error) {
          console.error("Error processing payment:", error);
          await sendMessage("order-topic", { orderId, paymentStatus: "failed" });
        }
      },
    });
  } catch (error) {
    console.error("Error consuming Kafka messages:", error);
  }
};

module.exports = { sendMessage, consumeMessages };