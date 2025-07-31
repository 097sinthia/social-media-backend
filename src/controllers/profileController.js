const Profile = require("../models/profileModel");
const User = require("../models/userModel");

async function createprofile(req, res) {
  const { phone, picture, bio, DOB, created_at } = req.body;
  const profile = await Profile.findOne({ user: req.user.id });

  if (profile) {
    return res.status(400).send("Profile already exists!"); // use return (if use return then next instructions will not excute)
  }

  const newprofile = new Profile({
    user: req.user.id,
    phone: phone,
    picture: picture,
    bio: bio,
    DOB: DOB,
    created_at: created_at,
  });

  await newprofile.save();

  const populatedProfile = await Profile.findById(newprofile._id).populate(
    //join
    "user",
    "username email"
  );
  await populatedProfile.save();

  res.status(200).send({
    message: "User Profile Created",
    user: populatedProfile,
  });
}

async function alluserprofile(req, res) {
  const users = await Profile.find({}).populate(
    //join
    "user",
    "username "
  );
  res.send({
    message: "All profile list",
    data: users,
  });
}

async function editprofile(req, res) {
  const { phone, picture, bio, DOB } = req.body;
  const Edited = await Profile.findOne({
    user: req.user.id,
  });
  console.log(Edited);
  if (!Edited) {
    return res.status(400).send({
      message: "No profile exist",
    });
  }

  (Edited.phone = phone),
    (Edited.picture = picture),
    (Edited.bio = bio),
    (Edited.DOB = DOB),
    //console.log(Edited);
    await Edited.save();

  return res.send({
    message: "Successfully edit the profile",
    data: Edited,
  });
}

async function deleteAccount(req, res) {
  const userId = req.user.id; // from auth middleware

  const user = await User.findById(userId);
  if (!user || user.isDeleted) {
    return res
      .status(404)
      .json({ message: "User not found or already deleted" });
  }

  user.isDeleted = true;
  user.deletedAt = new Date();

  await user.save();

  res
    .status(200)
    .json({ message: "Account scheduled for deletion in 30 days" });
}

async function cleanupDeletedUsers(req, res) {
  const THIRTY_DAYS_IN_MS = 30 * 24 * 60 * 60 * 1000;
  const cutoffDate = new Date(Date.now() - THIRTY_DAYS_IN_MS);

  const result = await User.deleteMany({
    isDeleted: true,
    deletedAt: { $lte: cutoffDate },
  });

  res.status(200).json({
    message: `✅ Permanently deleted ${result.deletedCount} users.`,
  });
}

async function accoutRecovery(req, res) {
  const user = await User.findById(req.user.id);

  if (!user || !user.isDeleted) {
    return res
      .status(400)
      .json({ message: "Account not eligible for recovery" });
  }

  const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;
  const timeSinceDeletion = Date.now() - new Date(user.deletedAt).getTime();

  if (timeSinceDeletion > THIRTY_DAYS) {
    return res.status(403).json({ message: "Recovery window expired" });
  }

  user.isDeleted = false;
  user.deletedAt = null;
  await user.save();

  res.json({
    message: "Account recovered successfully",
  });
}

module.exports = {
  createprofile: createprofile,
  alluserprofile: alluserprofile,
  editprofile: editprofile,
  deleteAccount: deleteAccount,
  cleanupDeletedUsers: cleanupDeletedUsers,
  accoutRecovery: accoutRecovery,
};
