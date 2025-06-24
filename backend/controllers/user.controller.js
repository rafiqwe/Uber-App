const userModel = require("../models/user.model");
const userService = require("../services/user.service");
const { validationResult } = require("express-validator");

module.exports.registerUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password } = req.body;

    // Hash password
    const hashPassword = await userModel.hashPassword(password);

    // Create user
    const user = await userService.createUser({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email,
      password: hashPassword,
    });

    // Generate token
    const token = user.generateAuthToken();

    res.status(201).json({ token, user });
  } catch (err) {
    console.error("Error registering user:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
