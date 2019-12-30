const path = require("path");
const session = require("express-session");
const express = require("express");
const passport = require("./server/config/passport");
const routes = require("./server/routes");
const app = express();

// Set up middle ware
app.use(require("morgan")("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

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
// app.use(routes);

app.post("/api/signup", passport.authenticate("signup"), (req, res) => {
  if (req.user || req.session.user) return res.redirect("/");
  return res.redirect("/signup");
});

app.post("/api/login", passport.authenticate("login"), (req, res) => {
  console.log(req.body);
  if (req.user || req.session.user)
    return res.status(200).json({ redirectURL: "/" });
  return res.redirect("/login");
});

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
