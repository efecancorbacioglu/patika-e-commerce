const mongoose = require("mongoose");
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("bağlandık");
  } catch (e) {
    console.error("MongoDB bağlantı hatası:", e);
    process.exit(1);
  }
}

module.exports = { connectDB };
