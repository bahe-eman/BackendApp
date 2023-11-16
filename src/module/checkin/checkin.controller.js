const prisma = require("../../db/index");
const express = require("express");
const router = express.Router();



router.get("/", async (req, res) => {
  try {
    const checkin = await prisma.transaction.findMany({
        select: {
            customer: {
                select: {
                    idCustomer: true,
                    nameCustomer: true,
                    addressCustomer: true,
                    tlpnCustomer: true,
                    emailCustomer: true,
                    nikCustomer: true,
                    statusCustomer: true,
                }
            },
            room: {
                select: {
                    floorId: true,
                    nameRoom: true,
                    numberRoom: true,
                }
            },
            checkIn: true,
            checkOut: true,
            booking: true,
            payment: true
        },
        where : {
            customer : {
                statusCustomer : 3
            }
        },
    })
    res.send({
      data: checkin,
      message: "get checkin success",
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
