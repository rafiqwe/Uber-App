const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const rideController = require("../controllers/ride.controller");
const authMiddleware = require("../middlewares/auth.middleware");
router.post(
  "/create",
  authMiddleware.auth,
  body("pickup")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Pickup location must be at least 3 characters long"),
  body("destination")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Destination location must be at least 3 characters long"),
  body("vehicleType")
    .isString()
    .isIn(["auto", "moto", "car"])
    .withMessage("Vehicle type must be one of: auto, motorcycle, car"),
  rideController.createRide
);

module.exports = router;
