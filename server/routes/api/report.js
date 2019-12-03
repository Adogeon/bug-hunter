const express = require("express");
const router = express.Router();

const {
  createReport,
  readAllReports,
  readReportsById,
  updateReport,
  deleteReport
} = require("../../handler/ReportHandler");

router.post("/", createReport);
router.get("/all", readAllReports);
router.get("/:reportId", readReportsById);
router.put("/:reportId", updateReport);
router.delete("/:reportId", deleteReport);

module.exports = router;
