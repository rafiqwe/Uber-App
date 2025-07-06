const rideService = require("../services/ride.service");
const mapsService = require("../services/maps.service");
const { validationResult } = require("express-validator");
const { sendMessageToSocketId } = require("../socket");
const rideModel = require("../models/ride.model");

module.exports.createRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const rideData = req.body;
    const userId = req.user._id;

    const newRide = await rideService.createRide({ ...rideData, userId });
    res.status(201).json(newRide);

    // After sending response, process background tasks
    const pickupCoordinates = await mapsService.getAddressCoordinate(
      rideData.pickup
    );

    const captainsInRadius = await mapsService.getCaptainsInTheRadius(
      pickupCoordinates.lat,
      pickupCoordinates.lng,
      5 // radius in km
    );
    newRide.otp = "";

    const rideWithUser = await rideModel
      .findOne({ _id: newRide._id })
      .populate("user");

    captainsInRadius.map((captain) => {
      // Update the ride with captain's details
      console.log(
        `Notifying captain ${captain._id} at ${captain.socketId} about new ride ${rideWithUser}`
      );
      sendMessageToSocketId(captain.socketId, "new-ride", rideWithUser);
    });

    console.log("Nearby Captains:", captainsInRadius);
  } catch (error) {
    console.error("Error creating ride:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

module.exports.confirmRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  console.log("Confirming ride with body:", req.body, "user :", req.user);

  try {
    const { rideId, captainId } = req.body;

    console.log("Confirming ride:", rideId, "by captain:", captainId);

    const updatedRide = await rideService.confirmRide({ rideId, captainId });

    if (!updatedRide) {
      return res.status(404).json({ message: "Ride not found" });
    }

    // Notify the user about the confirmed ride
    sendMessageToSocketId(
      updatedRide.user.socketId,
      "ride-confirmed",
      updatedRide
    );

    res.status(200).json(updatedRide);
  } catch (error) {
    console.error("Error confirming ride:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

module.exports.getFare = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { pickup, destination, vehicleType } = req.query;
    const fare = await rideService.getFare(pickup, destination, vehicleType);

    res.status(200).json({ fare: fare.toFixed(2) });
  } catch (error) {
    console.error("Error fetching fare:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

module.exports.startRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { rideId, otp } = req.query;
    const captainId = req.captain._id;

    const ride = await rideService.startRide(rideId, otp, captainId);

    if (!ride) {
      return res.status(404).json({ message: "Ride not found" });
    }

    console.log("user socketId :", ride.user.socketId);

    // Notify the user about the started ride
    sendMessageToSocketId(ride.user.socketId, "ride-started", ride);

    res.status(200).json(ride);
  } catch (error) {
    console.error("Error starting ride:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};


module.exports.endRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { rideId } = req.body;
    const captainId = req.captain._id;

    const ride = await rideService.endRide(rideId, captainId);

    if (!ride) {
      return res.status(404).json({ message: "Ride not found" });
    }

    // Notify the user about the ended ride
    sendMessageToSocketId(ride.user.socketId, "ride-ended", ride);

    res.status(200).json(ride);
  } catch (error) {
    console.error("Error ending ride:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};