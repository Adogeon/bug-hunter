const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local");

const User = mongoose.model("User");

passport.use(
  new LocalStrategy(async (username, password, cb) => {
    try {
      const user = await User.findOne({ username: username });
      if (!user || !user.validatePassword(password)) {
        return cb(null, false, {
          error: "username or password is invalid"
        });
      } else {
        return cb(null, user);
      }
    } catch (err) {
      return cb(null, false, { errors: err });
    }
  })
);

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser(async (id, cb) => {
  try {
    const user = await User.findOne({ _id: id });
    if (user) {
      return cb(null, user);
    } else {
      return cb(null, false, { error: "Can't find user id" });
    }
  } catch (err) {
    return cb(null, false, { error: err });
  }
});

module.exports = passport;
