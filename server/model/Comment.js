const mongoose = require("../config/mongoose.js");

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    require: true
  },
  body: {
    type: String,
    require: true
  }
});

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
