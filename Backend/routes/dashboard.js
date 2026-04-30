const express = require("express");
const router = express.Router();

const dashboardController = require("../controllers/dashboardController");
const ensureAuthorised = require("../middleware/auth");

// because of "/api/dashboard" prefix → final URL = /api/dashboard
router.get("/", ensureAuthorised, dashboardController.dashboard);

module.exports = router;