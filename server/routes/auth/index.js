/* eslint-disable spaced-comment */
const passport = require("passport");
const router = require("express").Router();
const User = require("../../model").User;

const isEmpty = str => {
  return str ? false : str.trim("") === "";
};

router.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  if (isEmpty(username)) {
    return res.status(422).json({ errors: "username should not be empty" });
  }

  if (isEmpty(password)) {
    return res.status(422).json({ errors: "password should not be empty" });
  }

  const usernameCheck = User.find({ username: username }).limit(1);
  if (usernameCheck.count() > 0) {
    return res.status(422).json({ errors: "Username is already taken" });
  } else {
    const newUser = await User.create({ username: username });
    newUser.setPassword(password);
    await newUser.save();
    return res.redirect("/");
  }
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  console.log("hello");

  if (isEmpty(username)) {
    return res.status(422).json({ errors: "username should not be empty" });
  }

  if (isEmpty(password)) {
    return res.status(422).json({ errors: "password should not be empty" });
  }

  return (
    passport.authenticate("local", { failureRedirect: "/login" }),
    (req, res) => {
      res.redirect("/");
    }
  );
});

/*router.get("/current", async (req, res, next) => {
  const { id } = req.paylod;

  const user = await User.findById(id);
  if (!user) {
    return res.status(400).json({ error: "Can't find user" });
  } else {
    return res.json({ user: user.toAuthJSON() });
  }
}); */

module.exports = router;
