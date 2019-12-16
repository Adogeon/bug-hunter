const mongoose = require("../config/mongoose.js");

const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
  sender: {
    type: Schema.Types.ObjectId,
    require: true
  },
  receivers: [
    {
      type: Schema.Types.ObjectId,
      require: true
    }
  ],
  notificationTypes: {
    type: String,
    require: true
  },
  createdAt: {
    type: String,
    require: true
  }
});

const Notification = mongoose.model("Notification", NotificationSchema);

module.exports = Notification;
