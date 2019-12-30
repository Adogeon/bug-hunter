const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("../model/User");
const { checkHash, createHash } = require("../helper/bcrypt.js");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findOne({ _id: id });
    if (user) {
      return done(null, user);
    } else {
      return done(null, false, { error: "Can't find user id" });
    }
  } catch (err) {
    return done(null, false, { error: err });
  }
});

passport.use(
  "login",
  new LocalStrategy(async (username, password, done) => {
    console.log("username", username);
    console.log("password", password);
    try {
      const userDoc = await User.findOne({ username: username });
      if (!userDoc) {
        return done(null, false, {
          error: "User not Found with username"
        });
      } else {
        if (!checkHash(password, userDoc.password)) {
          return done(null, false, {
            error: "Password is not valid"
          });
        } else {
          return done(null, userDoc);
        }
      }
    } catch (err) {
      return done(err);
    }
  })
);

passport.use(
  "signup",
  new LocalStrategy(async (username, password, done) => {
    try {
      const userDoc = await User.findOne({ username: username });
      if (userDoc) {
        return done(null, false, { error: "User Already Exists" });
      } else {
        const newUserDoc = await User.create({
          username: username,
          password: createHash(password)
        });
        return done(null, newUserDoc);
      }
    } catch (err) {
      return done(err);
    }
  })
);

module.exports = passport;
