const express = require('express');
const app = express();
const dotenv = require('dotenv');
const config = require('./config/db');
const routes = require('./routes/index');
const redis = require('./utils/redis')

dotenv.config();

app.use(express.json());

// app.use(express.urlencoded({ extended: true }));
  
//redis connection
redis.redisCon();

config.connectDB();

//disable cors

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});


app.use('/api', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server ${PORT} portunda çalışıyor.`);
});
