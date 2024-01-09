const express = require("express");
const { prisma } = require("../../db/index");
const { create } = require("express-handlebars");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { id, name, role, jwt } = req.body;
    await prisma.session.create({
      data: {
        id: id,
        name: name,
        role: role,
        jwt: jwt,
      },
    });
    return res.status(200).send({
      session: "ok",
    });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    // const id = req.headers["authorization"];
    const data = await prisma.session.findUnique({
      where: {
        id: req.headers["authorization"],
      },
    });
    return res.status(200).send({
      data: data,
    });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

module.exports = router;
