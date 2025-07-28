// receiver_id, title, description, action_url: /posts/:id, marked_as_read, createdAt.....
const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  receiver: {
    type: mongoose.Types.ObjectId,
    ref: "user", // who white which post
    required: true,
  },
  type_of: {
    //Like or Comment
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  post: {
    type: mongoose.Types.ObjectId,
    ref: "post", // who white which post
    required: true,
  },
  action_url: {
    type: String, // Add this line
    required: true, // Optional: only if you always need a redirect
  },
  marked_as_read: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date, //iso date string
    required: true,
  },
});
//console.log("this database is created");
const Notification = mongoose.model("notification", notificationSchema);

module.exports = Notification;
