const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "user", // who white which post
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  date: {
    type: Date, //iso date string
    required: true,
  },
});

const Post = mongoose.model("post", postSchema);

module.exports = Post;
