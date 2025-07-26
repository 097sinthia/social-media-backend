const express = require("express");
const postController = require("../controllers/postController");
const { authMiddleware } = require("../middlewares/auth");

const postRouter = express.Router();

postRouter.get("/post", postController.allpost);

postRouter.use(authMiddleware);
postRouter.post("/post", postController.createpost);
postRouter.delete("/post", postController.deletepost);
postRouter.get("/my-post", postController.userpost);
postRouter.put("/edit", postController.editpost);

module.exports = postRouter;
