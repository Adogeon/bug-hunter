// TODO: Create Tags
// TODO: Search report on tags
// TODO: List out all Tags

const TagDB = require("../model").Tag;
const ReportDB = require("../model").Report;

module.exports.createTags = async (req, res) => {
  const newTagData = req.body;
  try {
    const doc = await TagDB.create(newTagData);
    res.json({ success: true, data: doc });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports.readAllTags = async (req, res) => {
  try {
    const docs = await TagDB.find();
    res.json({ success: true, data: docs });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err });
  }
};

// TODO: need test later

module.exports.readReportByTag = async (req, res) => {
  try {
    const docs = ReportDB.find({ tags: req.params.tagId });
    if (docs) {
      res.json({ success: true, data: docs });
    } else {
      res.json({ success: false, error: "Can't find report match this tags" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err });
  }
};

module.exports.addTagsToReport = async (req, res) => {
  const { reportId, tagId } = req.body;
  try {
    const targetReport = await ReportDB.find({ _id: reportId });
    if (targetReport) {
      const updateResult = await ReportDB.updateOne(
        { _id: targetReport._id },
        { $push: { tags: tagId } }
      );
      if (updateResult.nModified > 0) {
        const updateReport = await ReportDB.find({ _id: reportId });
        res.json({ success: true, data: updateReport });
      } else {
        throw new Error("Can't add tags to the report");
      }
    } else {
      return res
        .status(403)
        .json({ success: false, error: "Can't find the report" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err });
  }
};
