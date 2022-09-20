const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
  const saltRounds = 11;
  const hashPassword = await bcrypt.hash(password, saltRounds);
  return hashPassword;
};

const comparePassword = async (password, hashPassword) => {
  const isMatched = await bcrypt.compare(password, hashPassword);
  return isMatched;
};

module.exports = { hashPassword, comparePassword };
