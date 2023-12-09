const express = require("express");
const { prisma } = require("../../db");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    return res.status(200).send(await prisma.status.findMany());
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

module.exports = router;
