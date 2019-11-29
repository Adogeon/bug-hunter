const mongoose = require("mongoose");

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

module.exports = mongoose.model("Notification", NotificationSchema);
