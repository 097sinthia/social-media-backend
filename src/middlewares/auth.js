const jwt = require("jsonwebtoken");

const secertKey = "sinthia-server-private-key";

async function authMiddleware(req, res, next) {
  //res.send("this is middleware");
  const token = req.headers["x-auth-token"];
  try {
    const decoded_jwt = jwt.verify(token, secertKey);
    if (!decoded_jwt) {
      return res.status(401).send("Unauthorized");
    }

    console.log(decoded_jwt);
    req.user = decoded_jwt;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).send("Invalid Token");
  }
}
module.exports = {
  authMiddleware,
};
