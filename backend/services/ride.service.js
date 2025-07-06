const rideModel = require("../models/ride.model");
const mapsService = require("../services/maps.service");
const crypto = require("crypto");

async function getFare(pickup, destination, vehicleType) {
  // This is a placeholder function. You can implement your own fare calculation logic.
  // For example, you can use distance and time to calculate the fare.

  if (!pickup || !destination || !vehicleType) {
    throw new Error("Pickup and destination must be provided");
  }
  const originCoords = await mapsService.getAddressCoordinate(pickup);
  const destinationCoords = await mapsService.getAddressCoordinate(destination);

  const distanceTime = await mapsService.getDistanceTime(
    originCoords,
    destinationCoords
  );

  let fare;
  let perKm, perMin;

  switch (vehicleType) {
    case "auto":
      perKm = 5;
      perMin = 0.5;
      break;
    case "moto":
      perKm = 4;
      perMin = 0.4;
      break;
    case "car":
      perKm = 10;
      perMin = 1;
      break;
    default:
      perKm = 12;
      perMin = 1.2;
  }

  const distance = parseFloat(distanceTime.distance.replace(" km", ""));
  const duration = parseFloat(distanceTime.duration.replace(" mins", ""));
  fare = distance * perKm + duration * perMin;
  return fare;
}

module.exports.getFare = getFare;

const getOtp = (num) => {
  const generateOtp = (num) => {
    const otp = crypto
      .randomInt(Math.pow(10, num - 1), Math.pow(10, num))
      .toString();
    return otp;
  };
  return generateOtp(num);
};

module.exports.createRide = async (rideData) => {
  const { userId, pickup, destination, vehicleType } = rideData;

  if (!userId || !pickup || !destination || !vehicleType) {
    throw new Error("Pickup, destination, and vehicle type are required");
  }

  const fare = await getFare(pickup, destination, vehicleType);
  console.log("Calculated Fare:", fare.toFixed(2));

  const newRide = await rideModel.create({
    user: userId,
    pickup,
    destination,
    fare: fare.toFixed(2),
    status: "pending",
    vehicleType,
    otp: getOtp(6),
  });

  return newRide;
};

module.exports.confirmRide = async ({ rideId, captainId }) => {
  if (!rideId || !captainId) {
    throw new Error("Ride ID and Captain ID are required");
  }

  console.log("Ride id captain id : ", rideId, captainId);

  try {
    await rideModel.findByIdAndUpdate(
      rideId,
      { captain: captainId, status: "accepted" },
      { new: true }
    );

    const ride = await rideModel
      .findById(rideId)
      .populate("user")
      .populate("captain")
      .select("+otp");

    if (!ride) {
      throw new Error("Ride not found");
    }

    return ride;
  } catch (error) {
    console.error("Error confirming ride:", error);
    throw new Error("Failed to confirm ride");
  }
};

module.exports.startRide = async (rideId, otp, captainId) => {
  if (!rideId || !otp || !captainId) {
    throw new Error("Ride ID, OTP, and Captain ID are required");
  }

  const ride = await rideModel
    .findOne({
      _id: rideId,
      captain: captainId,
      otp: otp,
    })
    .populate("user")
    .populate("captain");

  if (!ride) {
    throw new Error("Invalid ride or OTP");
  }

  ride.status = "ongoing";
  await ride.save();

  return ride;
};

module.exports.endRide = async (rideId, captainId) => {
  if (!rideId || !captainId) {
    throw new Error("Ride ID and Captain ID are required");
  }

  const ride = await rideModel
    .findOneAndUpdate(
      { _id: rideId, captain: captainId, status: "ongoing" },
      { status: "completed" },
      { new: true }
    )
    .populate("user")
    .populate("captain");

  if (!ride) {
    throw new Error("Ride not found or not ongoing");
  }

  return ride;
};
