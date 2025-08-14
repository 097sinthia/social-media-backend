require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const ratelimit = require("express-rate-limit");

const router = require("./src/routes");
const { connectMongoDB } = require("./src/configs/db");

const app = express();

let limiter = ratelimit({
  max: 30_000,
  windowsMs: 60 * 60 * 1000,
  message: "Too many request. Try after one hour",
});

app.use(limiter);

app.use(helmet());

// IIFE = Immediately Invokable Function Expression2
(async function () {
  await connectMongoDB();
})();

app.use(express.json());
app.use(router);

//console.log(process.env.JWT_SECRET_KEY);

router.get("/", (req, res) => {
  //console.log(req);
  res.send("Hey! How are you ?");
});

app.listen(3000, () => {
  console.log("Server is running in on port 3000");
});
