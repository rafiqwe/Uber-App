const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const userRoute = require("./routes/user.routes");
const cors = require("cors");
const cookieParser = require("cookie-parser");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use("/users", userRoute);

module.exports = app;
