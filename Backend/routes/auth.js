const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

// simple mapping
router.post("/signup", authController.signup);
router.post("/login", authController.login);

module.exports = router;