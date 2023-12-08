const crypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { checkUser } = require("./login.repository");
require("dotenv").config();
const SECRET_KEY = process.env.JWT_SECRET;

const generateAuthToken = (user) => {
  const payload = {
    idUser: user.idUser,
    emailUser: user.emailUser,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: 36000 });
  return token;
};

const loginUser = async (email, password) => {
  const user = await checkUser(email);

  if (!user) {
    throw Error("User not found");
  }

  const isPasswordValid = crypt.compareSync(password, user.passwordUser);

  if (!isPasswordValid) {
    throw Error("Invalid password");
  }

  const token = generateAuthToken(user);

  return { user, token };
};

module.exports = {
  loginUser,
  generateAuthToken,
};
