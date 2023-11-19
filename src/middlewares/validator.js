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

const validateCategory = async (req, res, next) => {
  try {
    const { nameCategory, descCategory, facilityCategory, price, image } =
      req.body;
    if (
      !nameCategory ||
      !descCategory ||
      !facilityCategory ||
      !price ||
      !image
    ) {
      return res.status(401).send({ message: "some field is missing...!" });
    }

    // const isTrue = validator.isFloat(price);
    // if (!isTrue)
    //   return res
    //     .status(401)
    //     .send({ message: "price must be number, execution failed!" });

    next();
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

module.exports = { ValidateLogin, validateCategory };
