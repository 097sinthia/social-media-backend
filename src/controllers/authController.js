const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const secertKey = "sinthia-server-private-key";

async function login(req, res) {
  const email = req.body.email;
  const isemailexist = await User.findOne({ email });

  console.log(isemailexist);
  if (!isemailexist) {
    return res.status(500).send("Email Doesn't exist");
  }
  const password = req.body.password;

  if (password !== isemailexist.password) {
    return res.status(500).send("incorrect password");
  }

  const payload = {
    id: isemailexist._id,
  };

  const token = jwt.sign(payload, secertKey, {
    //algorithm are skip here
    expiresIn: "30d",
  });

  res.send({
    success: true,
    message: "Login successful",
    token: token,
  });
}

async function register(req, res) {
  console.log(req.body);

  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).send("All fields required");
  }

  const isUserNameExists = await User.findOne({ username: username });
  if (isUserNameExists) {
    return res.status(400).send("Username already exists!");
  }

  const isEmailExists = await User.findOne({ email: email });
  if (isEmailExists) {
    return res.status(400).send("Email already exists!"); // use return (if use return then next instructions will not excute)
  }

  const newUser = new User({
    username: username,
    email: email,
    password: password,
  });

  await newUser.save();

  res.status(200).send({
    message: "User Created",
    user: newUser,
  });
}

async function forgetpass(req, res) {
  const email = req.body.email;
  const isemailexist = await User.findOne({ email });

  console.log(isemailexist);
  if (!isemailexist) {
    return res.status(500).send("Email Doesn't exist");
  }
  const otp = generateOTP();
  const expiry = Date.now() + 5 * 60 * 1000; // 5 minutes

  isemailexist.otp = otp;
  isemailexist.otp_expire_at = new Date(expiry);
  await isemailexist.save();

  // TODO: send `otp` via email/SMS here
  console.log(`OTP for ${email}: ${otp}`);

  res.send({
    success: true,
    message: "OTP is sent to your email. It will expire within 5 minutes",
  });
}
async function verifyOTP(req, res) {
  const { email, otp } = req.body;

  const isemailexist = await User.findOne({ email });

  console.log(isemailexist);
  if (!isemailexist || isemailexist.otp !== otp) {
    return res.status(500).send("Invalid OTP");
  }

  if (Date.now() > new Date(isemailexist.otp_expire_at).getTime()) {
    return res.status(400).send({ message: "OTP expired" });
  }

  res.send({
    success: true,
    message: "Verify OTP . Now you can change password",
  });
}
async function changepass(req, res) {
  const { email, newpassword } = req.body;
  const isemailexist = await User.findOne({ email });

  console.log(isemailexist);
  if (!isemailexist) {
    return res.status(500).send("Email Doesn't exist");
  }

  isemailexist.password = newpassword;

  isemailexist.otp = undefined;
  isemailexist.otp_expire_at = undefined;
  await isemailexist.save();

  res.send({
    success: true,
    message: "Password successfully chnage",
    data: isemailexist,
  });
}

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

module.exports = {
  login: login,
  register: register,
  forgetpass: forgetpass,
  verifyOTP: verifyOTP,
  changepass: changepass,
};
