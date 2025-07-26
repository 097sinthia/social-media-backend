const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  post: {
    type: mongoose.Types.ObjectId,
    ref: "post", // who white which post
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "user", // who white which post
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  date: {
    type: Date, //iso date string
    default: Date.now,
    required: true,
  },
});

const Comment = mongoose.model("comment", commentSchema);

module.exports = Comment;
