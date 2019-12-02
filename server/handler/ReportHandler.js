// TODO: intergrate Auth
// TODO: intergrate adding notifications( alert)
// TODO: intergrate search by projects
// TODO: adding search handler

const ReportDB = require("../model").Report;

module.exports.createReport = async (req, res) => {
  const newReportData = req.body;
  try {
    const doc = await ReportDB.create(newReportData);
    res.json({ success: true, data: doc });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports.readAllReports = async (req, res) => {
  try {
    const docs = await ReportDB.find();
    res.json({ success: true, data: docs });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err });
  }
};

module.exports.readReportsById = async (req, res) => {
  try {
    const doc = await ReportDB.findOne({ _id: req.params.reportId });

    if (doc != null) {
      res.json({ sucess: true, data: doc });
    } else {
      res.status(404).json({ success: false, error: "Can't find report" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).status({ success: false, errors: err });
  }
};

module.exports.updateReport = async (req, res) => {
  const newData = req.body;
  try {
    const doc = await ReportDB.findOne({ _id: req.params.reportId });

    if (doc != null) {
      const updateResult = await ReportDB.updateOne(
        { _id: doc._id },
        { $set: newData },
        { new: true }
      );
      if (updateResult.nModified > 0) {
        const updatedDoc = await ReportDB.findOne({ _id: doc._id });
        res.json({ sucess: true, data: updatedDoc });
      } else {
        throw new Error("Fail to update");
      }
    } else {
      res.status(404).json({ success: false, error: "Can't find report" });
    }
  } catch (err) {
    res.status(500).json({ success: false, errors: err.message });
    console.error(err);
  }
};

module.exports.deleteReport = async (req, res) => {
  try {
    const doc = await ReportDB.findOne({ _id: req.params.reportId });

    if (doc != null) {
      const deleteResult = await ReportDB.deleteOne({ _id: doc._id });
      if (deleteResult.deletedCount > 0) {
        res.json({ success: true });
      } else {
        throw new Error("Fail to delete");
      }
    } else {
      res.status(404).json({ success: false, error: "Can't find report" });
    }
  } catch (err) {
    res.status(500).json({ success: false, errors: err.message });
    console.error(err);
  }
};
