const mongoose = require("mongoose");
const env = require("./env");

let dbConnection;

async function connectMongoDB() {
  if (!dbConnection) {
    dbConnection = await mongoose.connect(env.MONGODB_URI);
    console.log("[DB] MongoDB connected!");
  }

  return dbConnection;
}

module.exports = {
  connectMongoDB: connectMongoDB,
};
