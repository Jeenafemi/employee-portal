const express = require("express");
const router = express.Router();

const dashboardController = require("../controllers/dashboardController");
const ensureAuthorised = require("../middleware/auth");

router.get("/", ensureAuthorised, dashboardController.dashboard);

module.exports = router;
