const crypt = require("bcrypt");
const validator = require("validator");
const { checkUser } = require("../module/login/login.repository");
const prisma = require("../db");

const ValidateLogin = async (req, res, next) => {
  try {
    const newData = req.body;
    if (!newData.emailUser || !newData.passwordUser) {
      return res.status(400).send({
        message: "username and password is required",
      });
    }
    const check = await checkUser(newData);
    if (!check) {
      return res.status(404).send({
        message: "user not found",
      });
    }

    const isValidPassword = crypt.compareSync(
      newData.passwordUser,
      check.passwordUser
    );
    if (!isValidPassword) {
      return res.status(400).send({
        message: "invalid password",
      });
    }

    req.userData = check;
    next();
  } catch (error) {
    console.log(error);
    return res.status(404).send("Email not found");
  }
};

module.exports = { ValidateLogin };
