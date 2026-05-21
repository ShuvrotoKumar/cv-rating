const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI || process.env.MONGO_URI.includes('your_mongodb')) {
      console.warn('⚠️ MONGO_URI is missing or placeholder. Running in fail-safe sandbox mode with local in-memory storage fallback.');
      return;
    }
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected successfully');
  } catch (err) {
    console.error('❌ MongoDB Connection Error:', err.message);
    console.warn('⚠️ Falling back to mock database sandbox. Server remains online.');
  }
};

module.exports = connectDB;

