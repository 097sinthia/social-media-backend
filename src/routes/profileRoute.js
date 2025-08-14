const express = require("express");
const profileController = require("../controllers/profileController");
const { authMiddleware } = require("../middlewares/auth");
const upload = require("../configs/multer");
const Profile = require("../models/profileModel");
const { default: mongoose } = require("mongoose");

const profileRouter = express.Router();

profileRouter.post(
  "/create",
  authMiddleware,
  upload.single("photo"),
  profileController.createprofile
);
profileRouter.get("/all", profileController.alluserprofile);
profileRouter.put("/edit", authMiddleware, profileController.editprofile);
profileRouter.put("/delete", authMiddleware, profileController.deleteAccount);
profileRouter.post(
  "/photo",
  authMiddleware,
  upload.single("photo"),
  async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded!" });
    }
    const r = await Profile.updateOne(
      { user_id: new mongoose.Types.ObjectId(req.user.id) },
      { picture: req.file.filename }
    );

    console.log(r);

    res.status(200).json({
      message: "Photo uploaded successfully!",
      file: req.file.filename,
      path: req.file.path,
    });
  }
);
profileRouter.delete("/cleanup", profileController.cleanupDeletedUsers);
profileRouter.post(
  "/recovery",
  authMiddleware,
  profileController.accoutRecovery
);

module.exports = profileRouter; //
