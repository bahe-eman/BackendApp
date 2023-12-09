const express = require("express");
const {
  allInfo,
} = require("./dash.service");
const router = express.Router();

router.get("/information", async (req, res) => {
  const users = await allInfo();

  res.send(users);
});
module.exports = router;
