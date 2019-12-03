const passport = require("passport");
const router = require("express").Router();
const auth = require("../../handler/auth");
const User = require("../../model").User;

const isEmpty = str => {
  return str ? false : str.trim("") === "";
};

router.post("/signup", auth.optional, async (req, res, next) => {
  const { username, password } = req.body;

  if (isEmpty(username)) {
    return res.status(422).json({ errors: "username should not be empty" });
  }

  if (isEmpty(password)) {
    return res.status(422).json({ errors: "password should not be empty" });
  }
  console.log("username", username);
  const usernameCheck = User.find({ username: username }).limit(1);
  console.log(usernameCheck.count() > 0);
  if (usernameCheck.count() > 0) {
    return res.status(422).json({ errors: "Username is already taken" });
  } else {
    const newUser = await User.create({ username: username });
    console.log(newUser);
    newUser.setPassword(password);
    console.log(newUser);
    await newUser.save();
    console.log(newUser);
    return res.json(newUser.toAuthJSON());
  }
});

router.post("/login", auth.optional, (req, res, next) => {
  const { username, password } = req.body;

  console.log("hello");

  if (isEmpty(username)) {
    return res.status(422).json({ errors: "username should not be empty" });
  }

  if (isEmpty(password)) {
    return res.status(422).json({ errors: "password should not be empty" });
  }

  return passport.authenticate(
    "local",
    { session: false },
    (err, passportUser, info) => {
      if (err) {
        return next(err);
      }

      if (passportUser) {
        const user = passportUser;
        user.token = passportUser.generateJWT();
        console.log(user);
        return res.json({ user: user.toAuthJSON() });
      }
    }
  )(req, res, next);
});

router.get("/current", auth.require, async (req, res, next) => {
  const { id } = req.paylod;

  const user = await User.findById(id);
  if (!user) {
    return res.status(400).json({ error: "Can't find user" });
  } else {
    return res.json({ user: user.toAuthJSON() });
  }
});

module.exports = router;
