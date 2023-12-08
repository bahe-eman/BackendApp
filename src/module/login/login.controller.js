const express = require("express");
const router = express.Router();
const JWT = require("jsonwebtoken");
require("dotenv").config();

router.post("/", async (req, res) => {
  try {
    const { userData } = req;
    delete userData.passwordUser;

    const token = JWT.sign({ id: userData.idUser }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    console.log(token);

    return res.status(200).send({
      message: "login success",
      token: token,
      userData,
    });
  } catch (err) {
    res.status(401).send({ error: err.message });
  }
});

module.exports = router;
