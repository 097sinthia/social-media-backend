const Notification = require("../models/notificationModel");

async function send(req, res) {
  const post_ID = req.query.id;

  const { type_of, message, date } = req.body;

  if (!type_of || !message || !date) {
    return res.status(500).send("All fields required");
  }

  const newnotification = new Notification({
    //notification will sent to a user(post owner) for creating comment,like by other user
    receiver: req.user.id,
    type_of: type_of,
    message: message,
    post: post_ID,
    action_url: `/posts/${post_ID}`,
    date: new Date(),
  });

  await newnotification.save();

  res.status(200).send({
    postNotification: newnotification,
  });
}

async function allnotification(req, res) {
  const notifications = await Notification.find({ receiver: req.user.id })
    .populate("post", "title")
    .sort({ date: -1 });

  res.status(200).send({
    data: notifications,
  });
}

module.exports = {
  send: send,
  allnotification: allnotification,
};
