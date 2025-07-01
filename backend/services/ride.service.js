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
