const Profile = require("../models/profileModel");

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

module.exports = {
  createprofile: createprofile,
  alluserprofile: alluserprofile,
  editprofile: editprofile,
};
