const axios = require("axios");

module.exports.getAddressCoordinate = async (address) => {
  if (!address) throw new Error("Address is required");

  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
    address
  )}&format=json&limit=1`;

  console.log("Calling:", url);

  const response = await axios.get(url, {
    headers: {
      "User-Agent": "UberCloneApp", // Required by Nominatim usage policy
    },
    timeout: 5000,
  });

  if (!response.data || response.data.length === 0) {
    throw new Error("Unable to fetch coordinates");
  }

  const { lat, lon } = response.data[0];

  return {
    lat: parseFloat(lat),
    lng: parseFloat(lon),
  };
};

module.exports.getDistanceTime = async (origin, destination) => {
  if (!origin || !destination) {
    throw new Error("Origin and destination are required");
  }

  const apiKey = process.env.ORS_API_KEY;

  const body = {
    coordinates: [
      [parseFloat(origin.lng), parseFloat(origin.lat)],
      [parseFloat(destination.lng), parseFloat(destination.lat)],
    ],
  };

  const headers = {
    Authorization: apiKey,
    "Content-Type": "application/json",
  };

  try {
    console.log("Request Body:", body); // For debugging

    const response = await axios.post(
      "https://api.openrouteservice.org/v2/directions/driving-car",
      body,
      { headers }
    );

    const summary = response.data.routes[0].summary;

    return {
      distance: `${(summary.distance / 1000).toFixed(2)} km`,
      duration: `${(summary.duration / 60).toFixed(1)} mins`,
    };
  } catch (error) {
    console.error(
      "OpenRouteService Error:",
      error.response?.data || error.message
    );
    throw new Error("Failed to get distance and time");
  }
};

module.exports.getAutocompleteSuggestion = async (input) => {
  if (!input) {
    throw new Error("Query is required");
  }

  const apiKey = process.env.ORS_API_KEY;
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
    input
  )}&format=json&addressdetails=1&limit=5`;
  try {
    const response = await axios.get(url, {
      headers: {
        "User-Agent": "uber-clone-app", // Required by Nominatim
      },
      timeout: 5000,
    });

    if (!response.data || response.data.length === 0) {
      return [];
    }

    // Map results to only useful fields for autocomplete
    return response.data.map((place) => ({
      display_name: place.display_name,
      lat: place.lat,
      lng: place.lon,
      type: place.type,
      class: place.class,
      address: place.address,
    }));
  } catch (error) {
    console.error("Nominatim autocomplete error:", error.message);
    throw new Error("Failed to fetch autocomplete suggestions");
  }
};
