const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const userController = require("../controllers/user.controller");
const authMiddleware = require('../middlewares/auth.middleware');
// Assuming userController.register is the handler function
router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("First name must be at least 3 characters long"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  userController.registerUser
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  userController.loginUser
);

router.get('/profile',authMiddleware.auth ,userController.getUserProfile)
router.get('/logout',authMiddleware.auth ,userController.logoutUser)

module.exports = router;
