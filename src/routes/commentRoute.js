const express = require("express");
const commentController = require("../controllers/commentcontroller");
const { authMiddleware } = require("../middlewares/auth");

const commentRouter = express.Router();

commentRouter.post("/comment", authMiddleware, commentController.createcomment);
commentRouter.get("/comment", commentController.allcomment);
commentRouter.put(
  "/editcomment",
  authMiddleware,
  commentController.editcomment
);

module.exports = commentRouter;
