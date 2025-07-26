const userRouter = require("express").Router();

const userController = require("../controllers/userController");

// DEFINE ROUTES HERE
userRouter.get("/all", userController.userlist);

module.exports = userRouter;

//during access (index/userRoute) //userController ar access in userRoute
