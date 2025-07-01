const rideService = require("../services/ride.service");
const { validationResult } = require("express-validator");

module.exports.createRide = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const rideData = req.body;
    const userId = req.user._id; // Assuming user ID is stored in req.user by auth middleware
    const newRide = await rideService.createRide({ ...rideData, userId });

    res.status(201).json(newRide);
  } catch (error) {
    console.error("Error creating ride:", error);
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
