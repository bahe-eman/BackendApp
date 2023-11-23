const express = require("express");
const { createUser } = require("./booking.service");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const newData = req.body;
    const user = await createUser(newData);

    res.send({
      data: user,
      message: "create booking success",
    });
  } catch (err) {
    // Memeriksa apakah kesalahan terkait validasi data
    if (err.name === "ValidationError") {
      res.status(400).send({
        error: "Invalid data",
        details: err.message,
      });
    } else {
      // Kesalahan umum lainnya
      res.status(500).send({
        error: "Internal Server Error",
        details: err.message,
      });
    }
  }
});

module.exports = router;
