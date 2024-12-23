const { Kafka } = require('kafkajs');

// Kafka bağlantısı
const kafka = new Kafka({
  clientId: 'e-ticaret-app',
  brokers: ['kafka:9092'], // Kafka broker adresi
});

const producer = kafka.producer();

const sendMessage = async (topic, message) => {
  try {
    await producer.connect();
    console.log('topic:',topic)
    console.log('girdik')
    console.log(`Producer connected for topic ${topic}`);
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


module.exports = sendMessage;
