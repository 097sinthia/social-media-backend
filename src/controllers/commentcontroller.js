const Comment = require("../models/commentModel");

const jwt = require("jsonwebtoken");

const secertKey = "sinthia-server-private-key";

async function createcomment(req, res) {
  const post_ID = req.query.id;

  const { body, date } = req.body;

  if (!body || !date) {
    return res.status(500).send("All fields required");
  }

  const newcomment = new Comment({
    user: req.user.id,
    post: post_ID,
    body: body,
    date: date,
  });

  await newcomment.save();

  res.status(200).send({
    message: "Comment Created",
    userComment: newcomment,
  });
}

async function allcomment(req, res) {
  const post_ID = req.query.id;
  const getpostcomment = await Comment.find({ post: post_ID });
  console.log(getpostcomment);
  if (!getpostcomment) {
    return res.status(500).send({
      message: "Invalid Post ID",
    });
  }

  return res.send({
    message: "Post's comments are given below ",
    data: getpostcomment,
  });
}

async function editcomment(req, res) {
  const comment_ID = req.query.id;
  if (!comment_ID) {
    return res.status(500).send({
      message: "No comment available",
    });
  }
  const Editcomment = await Comment.findOne({
    _id: comment_ID,
    user: req.user.id,
  });

  if (!Editcomment) {
    return res.status(400).send({
      message: "The user is not authorized to edit the comment",
    });
  }

  const { body } = req.body;

  Editcomment.body = body;
  Editcomment.date = Date.now();

  await Editcomment.save();

  return res.send({
    message: "Successfully edit the comment",
    data: Editcomment,
  });
}

module.exports = {
  createcomment: createcomment,
  allcomment: allcomment,
  editcomment: editcomment,
};
