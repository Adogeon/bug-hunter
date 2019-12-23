const bcrypt = require("bcryptjs");

module.exports.createHash = str => {
  return bcrypt.hashSync(str, bcrypt.genSaltSync(10));
};

module.exports.checkHash = (str, hash) => {
  return bcrypt.compareSync(str, hash);
};
