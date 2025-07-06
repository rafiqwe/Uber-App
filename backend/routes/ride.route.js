const express = require("express");
const router = express.Router();
const { body, query } = require("express-validator");
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

router.get(
  "/get-fare",
  authMiddleware.auth,
  query("pickup")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Pickup location must be at least 3 characters long"),
  query("destination")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Destination location must be at least 3 characters long"),
  query("vehicleType")
    .isString()
    .isIn(["auto", "moto", "car"])
    .withMessage("Vehicle type must be one of: auto, motorcycle, car"),
  rideController.getFare
);

router.post(
  "/confirm",
  authMiddleware.authCaptain,
  body("rideId").isMongoId().withMessage("Invalid ride ID"),
  rideController.confirmRide
);

router.get(
  "/start-ride",
  authMiddleware.authCaptain,
  query("rideId").isMongoId().withMessage("Invalid ride ID"),
  query("otp")
    .isString()
    .isLength({ min: 6, max: 6 })
    .withMessage("OTP must be 6 characters long"),
  rideController.startRide
);

router.post(
  "/end-ride",
  authMiddleware.authCaptain,
  body("rideId").isMongoId().withMessage("Invalid ride ID"),
  rideController.endRide
);

module.exports = router;
