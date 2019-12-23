const mongoose = require("../config/mongoose.js");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  comment: {
    type: Schema.Types.ObjectId,
    ref: "Comment"
  },
  notification: {
    type: Schema.Types.ObjectId,
    ref: "Notification"
  },
  report: {
    type: Schema.Types.ObjectId,
    ref: "Report"
  }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
