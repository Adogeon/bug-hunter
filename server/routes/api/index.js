const express = require("express");
const router = express.Router();

router.use("/report", require("./report.js"));

module.exports = router;
