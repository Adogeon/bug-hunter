const mongoose = require("../config/mongoose.js");

const Schema = mongoose.Schema;

const ReportSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    required: true
  },
  reproduceStep: {
    type: String
  },
  expectResult: {
    type: String
  },
  actualResult: {
    type: String
  },
  enviroment: {
    type: String
  },
  reporter: {
    type: String
  },
  status: {
    type: String,
    default: "Reported"
  },
  tags: {
    type: Schema.Types.ObjectId,
    ref: "Tag"
  },
  comments: {
    type: Schema.Types.ObjectId,
    ref: "Comment"
  }
});

const Report = mongoose.model("Report", ReportSchema);

module.exports = Report;
