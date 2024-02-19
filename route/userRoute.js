const express = require("express");
const router = express.Router();
const connectDatabase = require("../dbConnection");
const {
  registerUser,
  loginUser,
  getUserData, 
  getAllUsers,
} = require("../controller/userController");

router.post("/register", registerUser);
router.post("/login-user", loginUser);
router.post("/userData", getUserData);
router.get("/getAllUser", getAllUsers);

module.exports = router;
