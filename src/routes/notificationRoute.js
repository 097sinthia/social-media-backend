const express = require("express");
const { authMiddleware } = require("../middlewares/auth");
const notificationController = require("../controllers/notificationController");

const notificationRouter = express.Router();

notificationRouter.post(
  "/notification",
  authMiddleware,
  notificationController.send
);

notificationRouter.get(
  "/notification",
  authMiddleware,
  notificationController.allnotification
);
//commentRouter.get("/comment", commentController.allcomment);

module.exports = notificationRouter;
