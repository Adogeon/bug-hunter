// TODO: create a comment

const CommentDB = require("../model").Comment;
const ReportDB = require("../model").Report;

// TODO: test this out
module.exports.createComment = async (req, res) => {
  const targetReportId = req.body.reportId;
  const newCommentData = {
    user: req.user._id,
    body: req.body.body
  };
  try {
    const newCommentDoc = await CommentDB.create(newCommentData);
    const targetReportUpdate = await ReportDB.updateOne(
      { _id: targetReportId },
      { $push: { comments: newCommentDoc._id } }
    );

    if (targetReportUpdate.nModified > 0) {
      const newTargetReport = await ReportDB.findOne({ _id: targetReportId });
      res.json({ success: true, data: newTargetReport });
    } else {
      throw new Error("Can't add comment to report");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err });
  }
};
