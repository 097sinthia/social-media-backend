const express = require("express");

const authRouter = require("./authRoute");
const userRouter = require("./userRoute");
const postRouter = require("./postRoute");
const commentRouter = require("./commentRoute");
const notificationRouter = require("./notificationRoute");
const profileRouter = require("./profileRoute");

const router = express.Router();

router.use("/auth", authRouter);
router.use("/post", postRouter);
router.use("/user", userRouter);
router.use("/comment", commentRouter);
router.use("/notification", notificationRouter);
router.use("/profile", profileRouter);

module.exports = router;
