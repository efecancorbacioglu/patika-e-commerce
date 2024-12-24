const express = require("express");
const { connectProducer, consumeMessages } = require("./kafka");
const paymentRoutes = require("./routes/paymentRoutes");
const config = require("./config/db");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(express.json());

config.connectDB();

connectProducer();
consumeMessages();

app.use("/api/payments", paymentRoutes);

app.listen(3001, () => console.log("Payment service running on port 3001"));
