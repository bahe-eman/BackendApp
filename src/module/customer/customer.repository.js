const { prisma } = require("../../db");
const express = require("express");
const router = express.Router();

const all = async (req, res) => {
  try {
    const customer = await prisma.customer.findMany({
      //   select: {
      //     idCustomer: true,
      //     nameCustomer: true,
      //     nikCustomer: true,
      //     emailCustomer: true,
      //     tlpnCustomer: true,
      //     addressCustomer: true,
      //     fotoCustomer: true,
      //     paswordCustomer: true,
      //     statusId: true,
      //     statusCustomer: true,
      //   },
    });

    res.send({
      customer: customer,
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
};

const add = async (req, res) => {
  try {
    const {
      nameCustomer,
      nikCustomer,
      emailCustomer,
      tlpnCustomer,
      addressCustomer,
      fotoCustomer,
      paswordCustomer,
      statusCustomer,
    } = req.body;
    await prisma.customer.create({
      data: {
        nameCustomer: nameCustomer,
        nikCustomer: nikCustomer,
        emailCustomer: emailCustomer,
        tlpnCustomer: tlpnCustomer,
        addressCustomer: addressCustomer,
        fotoCustomer: fotoCustomer,
        paswordCustomer: paswordCustomer,
        statusCustomer: parseInt(statusCustomer),
      },
    });
    return res.status(200).send({ message: "add customer" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

module.exports = { all, add };
