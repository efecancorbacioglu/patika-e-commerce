const express = require('express');
const { consumeMessages } = require('./kafka');
const paymentRoutes = require("./routes/paymentRoutes");
const config = require('./config/db');
const dotenv = require('dotenv');

const app = express();

dotenv.config();

app.use(express.json());

config.connectDB();

app.use("/api/payments", paymentRoutes);

consumeMessages().then(() => console.log('kafka payment consume message çalıştı')).catch((error) => {
  console.error("Error starting Kafka consumer:", error);
});

app.listen(3001, () => console.log('Payment service running on port 3001'));
