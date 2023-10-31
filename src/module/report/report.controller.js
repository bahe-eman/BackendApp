const prisma = require("../../db/index");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const reports = await prisma.transaction.findMany({
      select: {
        customer: {
          select: {
            nameCustomer: true,
          },
        },
        room: {
          select: {
            nameRoom: true,
          },
        },
        status: {
          select: {
            nameStatus: true,
          },
        },
        checkIn: true,
        checkOut: true,
        booking: true,
        payment: {
          select: {
            paymentStatus: true,
          },
        },
      },
    });

    res.send({
      data: reports,
      message: "get reports success",
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
