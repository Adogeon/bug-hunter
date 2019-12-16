const path = require("path");
const session = require("express-session");
const express = require("express");
const passport = require("./server/config/passport");
const routes = require("./server/routes");
const app = express();

// Set up middle ware
app.use(require("morgan")("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Set up Passport JS
app.use(
  session({
    secret: "bug-hunter",
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Set up Mongoose
/* const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/bug-hunter", {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});
mongoose.set("debug", true);
require("./server/model");*/

// Router
app.use(routes);

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
