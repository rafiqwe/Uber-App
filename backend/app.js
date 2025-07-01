const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRoute = require("./routes/user.routes");
const captainRoute = require("./routes/captain.route");
const mapsRoute = require("./routes/map.route");
const rideRoute = require("./routes/ride.route");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use("/users", userRoute);
app.use("/captain", captainRoute);
app.use("/maps", mapsRoute);
app.use("/ride", rideRoute);

module.exports = app;
