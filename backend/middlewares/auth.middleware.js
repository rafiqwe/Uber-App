const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const blacklistTokenModel = require("../models/blacklistToken.model");
const captainModel = require("../models/captain.model");

module.exports.auth = async (req, res, next) => {
  try {
    // Get token from cookies or Authorization header
    const token =
      req.cookies?.token || req.headers?.authorization?.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    const isBlackList = await blacklistTokenModel.findOne({ token });

    if (isBlackList) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user by ID
    const user = await userModel.findById(decoded._id);

    if (!user) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    // Attach user to request object
    req.user = user;
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error.message);
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

module.exports.authCaptain = async (req, res, next) => {
  try {
    // Get token from cookies or Authorization header
    const token =
      req.cookies?.token || req.headers?.authorization?.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    const isBlackList = await blacklistTokenModel.findOne({ token });

    if (isBlackList) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user by ID
    const captain = await captainModel.findById(decoded._id);

    if (!captain) {
      return res
        .status(401)
        .json({ message: "Unauthorized: captain not found" });
    }

    // Attach captain to request object
    req.captain = captain;
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error.message);
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};
