const express = require("express");
const { allUsers, allFloor, allRoom, allPayment } = require("./option.service");
const router = express.Router();

router.get("/", async (req, res) => {
  const users = await allUsers();

  res.send(users);
});
router.get("/floor", async (req, res) => {
  const users = await allFloor();

  res.send(users);
});
router.get("/rooms/:cat/:flo", async (req, res) => {
  const categ = req.params.cat;
  const flor = req.params.flo;
  const users = await allRoom(parseInt(categ), parseInt(flor));

  res.send(users);
});

router.get("/status-payment", async (req, res) => {
  const users = await allPayment();

  res.send(users);
});

module.exports = router;
