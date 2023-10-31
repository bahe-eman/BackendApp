// masih coba2
const express = require("express");
const router = express.Router();
require("dotenv").config();

const blacklist = [];

router.post("/", (req, res) => {
  const token = req.header("authorization");

  if (blacklist.includes(token)) {
    return res.status(401).json({ message: "Anda belum login" });
  }

  blacklist.push(token);

  res.json({ message: "Logged out successfully" });
});

module.exports = router;
