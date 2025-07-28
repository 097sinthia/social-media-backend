require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const router = require("./src/routes");
const { connectMongoDB } = require("./src/configs/db");

const app = express();

// IIFE = Immediately Invokable Function Expression
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
