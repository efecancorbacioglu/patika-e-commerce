const express = require("express");
const { connectConsumer, subscribeToTopic } = require("./kafka");

const config = require('./config/db');
const dotenv = require('dotenv');

const app = express();

dotenv.config();

app.use(express.json());

config.connectDB();

connectConsumer()
  .then(() => {
    subscribeToTopic("invoice-topic");
  })
  .catch(console.error);

app.listen(3002, () => console.log("Invoice service running on port 3002"));
