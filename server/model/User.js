const mongoose = require("mongoose");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    require: true
  },
  hash: String,
  salt: String,
  comment: {
    type: Schema.Types.ObjectId,
    ref: "Comment"
  },
  notification: {
    type: Schema.Types.ObjectId,
    ref: "Notification"
  },
  report: {
    type: Schema.Types.ObjectId,
    ref: "Report"
  }
});

UserSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
    .toString("hex");
};

UserSchema.methods.validatePassword = function(password) {
  const testHash = crypto
    .pbkdf25sync(password, this.salt, 10000, 512, "sha512")
    .toString("hex");
  return this.hash === testHash;
};

UserSchema.methods.generateJWT = function() {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);

  return jwt.sign(
    {
      username: this.username,
      id: this._id,
      exp: parseInt(expirationDate.getTime() / 1000, 10)
    },
    "secret"
  );
};

UserSchema.methods.toAuthJSON = function() {
  console.log(this);
  return {
    _id: this._id,
    email: this.email,
    token: this.generateJWT()
  };
};

module.exports = mongoose.model("User", UserSchema);
