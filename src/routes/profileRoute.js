const express = require("express");
const profileController = require("../controllers/profileController");
const { authMiddleware } = require("../middlewares/auth");

const profileRouter = express.Router();

profileRouter.post("/create", authMiddleware, profileController.createprofile);
profileRouter.get("/all", profileController.alluserprofile);
profileRouter.put("/edit", authMiddleware, profileController.editprofile);
profileRouter.put("/delete", authMiddleware, profileController.deleteAccount);
profileRouter.delete("/cleanup", profileController.cleanupDeletedUsers);
profileRouter.post(
  "/recovery",
  authMiddleware,
  profileController.accoutRecovery
);

module.exports = profileRouter; //
