const mongoose = require("mongoose");
const rideService = require("../services/ride.service");
const getOtp = rideService.getOtp;
const rideSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  captain: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Captain",
    required: false,
  },
  pickup: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  fare: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "ongoing", "completed", "cancelled"],
    default: "pending",
  },
  duration: {
    type: Number,
    required: false,
  },
  destance: {
    type: Number,
    required: false,
  },
  paymentID: {
    trype: String,
  },
  orderID: {
    type: String,
    required: false,
  },
  signature: {
    type: String,
  },
  vehicleType: {
    type: String,
    enum: ["auto", "moto", "car"],
    required: true,
  },
  otp: {
    type: String,
    required: true,
    select: false,
  },
});

module.exports = mongoose.model("ride", rideSchema);
