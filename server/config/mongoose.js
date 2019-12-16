const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/bug-hunter", {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});
mongoose.set("debug", true);

module.exports = mongoose;
