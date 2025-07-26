const authRouter = require("express").Router();

const authController = require("../controllers/authController");

// DEFINE ROUTES HERE
authRouter.post("/login", authController.login);
authRouter.post("/register", authController.register);
authRouter.post("/forgetpass", authController.forgetpass);
authRouter.post("/verifyOTP", authController.verifyOTP);
authRouter.post("/changepass", authController.changepass);

module.exports = authRouter;
