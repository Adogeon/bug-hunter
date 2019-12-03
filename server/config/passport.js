const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local");

const User = mongoose.model("User");

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username: username });
      if (!user || !user.validatePassword(password)) {
        return done(null, false, {
          error: "username or password is invalid"
        });
      } else {
        return done(null, user);
      }
    } catch (err) {
      return done(null, false, { errors: err });
    }
  })
);
