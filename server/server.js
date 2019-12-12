const path = require("path");
const session = require("express-session");
const express = require("express");
const passport = require("./config/passport");
const routes = require("./routes");
const app = express();

// const isProduction = process.env.NODE_ENV === "production";

app.use(require("morgan")("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "bug-hunter",
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/bug-hunter", {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});
mongoose.set("debug", true);

const PORT = 3001;

app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
