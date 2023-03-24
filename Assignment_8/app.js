const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/user");

const app = express();

app.use(bodyParser.json());

const userRouter = require("./routes/user");

app.use("/user", userRouter);

mongoose.connect("mongodb://127.0.0.1:27017/", { family: 4 }, () => {
  console.log("connected to db, starting app");
  app.listen(3000);
  console.log("app started");
});
