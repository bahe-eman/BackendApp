const express = require("express");
const { prisma } = require("../../db/index");
const { create } = require("express-handlebars");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, role, jwt } = req.body;
    await prisma.session.create({
      data: {
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
    const data = await prisma.session.findMany({
      where: {
        name: "admin",
      },
    });
    console.log(data);
    return res.status(200).send("okay");
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

module.exports = router;
