const mapsService = require("../services/maps.service");
const { validationResult } = require("express-validator");

module.exports.getCoordinates = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { address } = req.query;
  try {
    const coordinates = await mapsService.getAddressCoordinate(address);
    res.status(200).json(coordinates);
  } catch (error) {
    res.status(404).json({ message: "Coordinates not found ", error: error });
  }
};

module.exports.getDistanceTime = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { origin, destination } = req.query;

    // Convert address to coordinates
    const originCoords = await mapsService.getAddressCoordinate(origin);
    const destinationCoords = await mapsService.getAddressCoordinate(
      destination
    );
    console.log("Origin Coords:", originCoords);
    console.log("Destination Coords:", destinationCoords);

    const distanceTime = await mapsService.getDistanceTime(
      originCoords,
      destinationCoords
    );

    res.status(200).json(distanceTime);
  } catch (error) {
    console.log("error : ", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

module.exports.getAutocompleteSuggestion = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { input } = req.query;

    const suggestions = await mapsService.getAutocompleteSuggestion(input);

    res.status(200).json(suggestions);
  } catch (error) {
    console.log(error);
  }
};
