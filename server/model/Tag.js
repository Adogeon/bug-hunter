const mongoose = require("../config/mongoose.js");

const Schema = mongoose.Schema;

const TagSchema = new Schema({
  name: {
    type: String,
    require: true
  }
});

const Tag = mongoose.model("Tag", TagSchema);

module.exports = Tag;
