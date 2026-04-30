const express = require("express");
const router = express.Router();

const employeeRouter = require("../controllers/employeeController");
const ensureAuthorised = require("../middleware/auth");

router.post("/upsert", ensureAuthorised, employeeRouter.upsertEmployee);
router.post("/list", ensureAuthorised, employeeRouter.listEmployees);
router.post("/get", ensureAuthorised, employeeRouter.getEmployee);
router.post("/toggle-status", ensureAuthorised, employeeRouter.toggleStatus);
router.post("/delete", ensureAuthorised, employeeRouter.deleteEmployee);

module.exports = router;