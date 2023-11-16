const prisma = require("../../db/index");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const customer = await prisma.customer.findMany({
      select: {
        idCustomer: true,
        nameCustomer: true,
        nikCustomer: true,
        emailCustomer: true,
        tlpnCustomer: true,
        addressCustomer: true,
        fotoCustomer: true,
        paswordCustomer: true,
        statusId: true,
        statusCustomer: true,
      },
    });

    res.send({
      data: customer,
      message: "get customer success",
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
