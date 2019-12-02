const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/bug-hunter", {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

const PORT = 3001;

const {
  createReport,
  readAllReports,
  readReportsById,
  updateReport,
  deleteReport
} = require("./handler/ReportHandler");

app.post("/api/report", createReport);
app.get("/api/report/all", readAllReports);
app.get("/api/report/:reportId", readReportsById);
app.put("/api/report/:reportId", updateReport);
app.delete("/api/report/:reportId", deleteReport);

app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
