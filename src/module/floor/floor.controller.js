const express = require("express");
const { allUsers } = require("./floor.service");
const { prisma } = require("../../db");
const router = express.Router();

router.get("/", async (req, res) => {
  const users = await allUsers();

  res.send(users);
});

router.get("/:id", async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const users = await userById(userId);
    res.send(users);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const { nameFloor } = req.body;
    await prisma.floor.create({
      data: {
        nameFloor: nameFloor,
      },
    });
    return res.status(200).send({
      message: "floor added...",
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await prisma.floor.delete({
      where: { idFloor: id },
    });
    return res.status(200).send({ message: "deleted...." });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

module.exports = router;
