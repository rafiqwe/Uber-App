const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const { query } = require("express-validator");
const mapController = require("../controllers/map.controller");

router.get(
  "/get-coordinates",
  query("address").isString().isLength({ min: 3 }),
  authMiddleware.auth,
  mapController.getCoordinates
);

router.get(
  "/get-distance-time",
  query("origin").isString().isLength({ min: 3 }),
  query("destination").isString().isLength({ min: 3 }),
  authMiddleware.auth,
  mapController.getDistanceTime
);

router.get(
  "/get-suggestions",
  query("input").isString().isLength({ min: 3 }),
  authMiddleware.auth,
  mapController.getAutocompleteSuggestion
);

module.exports = router;
