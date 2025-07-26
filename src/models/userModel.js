const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: false,
  },
  otp_expire_at: {
    type: Date,
    reuired: false,
  },
});

const User = mongoose.model("user", userSchema);

module.exports = User;
