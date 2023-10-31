const express = require("express");
const { loginUser, generateAuthToken } = require("./login.service");
const router = express.Router();
require("dotenv").config();

router.post("/", async (req, res) => {
  try {
    const { emailUser, passwordUser } = req.body;

    const { user, token } = await loginUser(emailUser, passwordUser);

    return res.status(200).send({
      message: "login sukses",
      token: token,
      user
    });
  } catch (err) {
    res.status(401).send({ error: err.message });
  }
});


module.exports = router;
