require("dotenv").config();

// Load all models (this MUST come before sequelize.sync)
require("./models");

const app = require("./app");
const { sequelize } = require("./config/mysql");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 4000;

async function start() {
  try {
    // MySQL connection
    await sequelize.authenticate();
    console.log("✅ MySQL connected");

    // Sync all models
    await sequelize.sync({ alter: true });
    console.log("✅ Sequelize models synced");

    // MongoDB connection (optional)
    if (process.env.MONGO_URI) {
      await mongoose.connect(process.env.MONGO_URI);
      console.log("✅ MongoDB connected");
    }

    // Start server
    app.listen(PORT, () => {
      console.log(`🚀 Server listening on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err);
    process.exit(1);
  }
}

start();
