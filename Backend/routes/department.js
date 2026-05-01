const express = require("express");
const router = express.Router();

const dept = require("../controllers/departmentController");
const ensureAuthorised = require("../middleware/auth");

router.post("/upsert", ensureAuthorised, dept.upsertDepartment);
router.post("/list", ensureAuthorised, dept.listDepartment);
router.post("/get", ensureAuthorised, dept.getDepartment);
router.post("/toggle-status", ensureAuthorised, dept.toggleDepartmentStatus);
router.post("/delete", ensureAuthorised, dept.deleteDepartment);
module.exports = router;
