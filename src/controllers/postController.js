const Post = require("../models/postModel");
//const Comment = require("../models/commentModel");

const jwt = require("jsonwebtoken");

const secertKey = "sinthia-server-private-key";

async function allpost(req, res) {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 20;
  const skip = (page - 1) * limit;
  console.time("dbQuery");
  // const posts = await Post.find({}).limit(limit).skip(skip);
  // const totalResult = await Post.countDocuments();

  const [posts, totalResult] = await Promise.all([
    Post.find({}).limit(limit).skip(skip),
    Post.countDocuments(),
  ]);
  console.timeEnd("dbQuery");

  const totalPage = Math.ceil(totalResult / limit);

  return res.send({
    message: "All posts list",
    data: posts,
    meta: {
      page,
      limit,
      totalResult,
      totalPage,
    },
  });
}

async function createpost(req, res) {
  const { title, body, date } = req.body;

  if (!title || !body || !date) {
    return res.status(500).send("All fields required");
  }

  const newPost = new Post({
    user: req.user.id,
    title: title,
    body: body,
    date: date,
  });

  await newPost.save();

  res.status(200).send({
    message: "Post Created",
    user: newPost,
  });
}

async function deletepost(req, res) {
  const post_id = req.query.id;
  console.log(post_id);

  const deletedPost = await Post.findOneAndDelete({
    _id: post_id,
    user: req.user.id,
  });
  if (!deletedPost) {
    return res.status(404).send({
      message: "This post is not available",
    });
  }
  return res.send({
    message: "Deleted one Item",
    data: deletedPost,
  });
}

async function userpost(req, res) {
  const getuserposts = await Post.find({ user: req.user.id });
  return res.send({
    message: "All posts list of given user",
    data: getuserposts,
  });
}

async function editpost(req, res) {
  const post_ID = req.query.id;
  if (!post_ID) {
    return res.status(500).send({
      message: "No post available",
    });
  }
  const EditPost = await Post.findOne({
    _id: post_ID,
    user: req.user.id,
  });

  if (!EditPost) {
    return res.status(400).send({
      message: "The user is not authorized to edit the post",
    });
  }

  const { title, body } = req.body;

  EditPost.title = title;
  EditPost.body = body;
  EditPost.date = Date.now();

  await EditPost.save();

  return res.send({
    message: "Successfully edit the post",
    data: EditPost,
  });
}

module.exports = {
  allpost: allpost,
  createpost: createpost,
  deletepost: deletepost,
  userpost: userpost,
  editpost: editpost,
};
