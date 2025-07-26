const User = require("../models/userModel");

async function userlist(req, res) {
  const users = await User.find({});
  res.send({
    message: "All users list",
    data: users,
  });
}
module.exports = {
  userlist: userlist,
};
