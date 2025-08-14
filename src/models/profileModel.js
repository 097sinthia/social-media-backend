const mongoose = require("mongoose");

const userprofileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "user", // who white which post
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    default: "",
  },
  bio: {
    type: String,
    maxlength: 300,
  },
  DOB: {
    type: Date,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Profile = mongoose.model("profile", userprofileSchema);

module.exports = Profile;
