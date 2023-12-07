const { prisma } = require("../../db/index");
const express = require("express");
const router = express.Router();



router.get("/in", async (req, res) => {
  try {
    const checkIn = await prisma.transaction.findMany({
      select: {
        customer: {
          select: {
            idCustomer: true,
            nameCustomer: true,
            nikCustomer: true,
            emailCustomer: true,
          },
        },
        room: {
          select: {
            numberRoom: true,
          },
        },
        statusTransaction: true,
        status: {
          select: {
            nameStatus: true,
          },
        },
        checkIn: true,
      },
      where: {
        statusTransaction: 3,
      }
    });

    res.send({
      data: checkIn,
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

router.get("/out", async (req, res) => {
  try {
    const checkOut = await prisma.transaction.findMany({
      select: {
        customer: {
          select: {
            idCustomer: true,
            nameCustomer: true,
            nikCustomer: true,
            emailCustomer: true,
          },
        },
        room: {
          select: {
            numberRoom: true,
          },
        },
        statusTransaction: true,
        status: {
          select: {
            nameStatus: true,
          },
        },
        checkOut: true,
      },
      where: {
        statusTransaction: 4,
      }
    });
    res.send({
      data: checkOut,
      message: "get checkout success",
    })
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
})


router.get("/out/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const singgleCheckOut = await prisma.transaction.findUnique({
      where: {
        idTransaction: id,
        statusTransaction: 4
      },
      select: {
        room: {
          select: {
            numberRoom: true,
            nameRoom: true,
            floorId: true,
          }
        },
        customer: {
          select: {
            nikCustomer: true,
            nameCustomer: true,
            tlpnCustomer: true,
            emailCustomer: true,
            addressCustomer: true,
          }
        },
        payment: {
          select: {
            paymentStatus: true,
          }
        },
        checkIn: true,
        checkOut: true,
      }
    })
    if (!singgleCheckOut) {
      return res.status(404).send({ message: "data not found..." })
    }
    res.send({
      data: singgleCheckOut,
      message: "get checkin success",
    })
  } catch (err) {
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
})

router.get("/in/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const singgleCheckIn = await prisma.transaction.findUnique({
      where: {
        idTransaction: id,
        statusTransaction: 3
      },
      select: {
        room: {
          select: {
            numberRoom: true,
            nameRoom: true,
            floorId: true,
          }
        },
        customer: {
          select: {
            nikCustomer: true,
            nameCustomer: true,
            tlpnCustomer: true,
            emailCustomer: true,
            addressCustomer: true,
          }
        },
        payment: {
          select: {
            paymentStatus: true,
          }
        },
        checkIn: true,
        checkOut: true,
      }
    })
    if (!singgleCheckIn) {
      return res.status(404).send({ message: "data not found..." })
    }
    res.send({
      data: singgleCheckIn,
      message: "get checkin success",
    })
  } catch (err) {
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
})

router.patch("/in/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const updateChekIn = await prisma.transaction.update({
      where: {
        idTransaction: id,
        statusTransaction: 3
      },
      data: {
        statusTransaction: 4
      },
    })
    if (!updateChekIn) {
      return res.status(404).send({ message: "data not found..." })
    }
    res.send({
      data: updateChekIn,
      message: "update checkin success",
    })
  } catch (err) {
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
})

router.patch("/out/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const updateChekOut = await prisma.transaction.update({
      where: {
        idTransaction: id,
        statusTransaction: 4
      },
      data: {
        statusTransaction: 5
      },
    })
    if (!updateChekOut) {
      return res.status(404).send({ message: "data not found..." })
    }
    res.send({
      data: updateChekOut,
      message: "update checkout success",
    })
  } catch (err) {
    if (err.name === "ValidationError") {
      res.status(400).send({
        error: "Invalid data",
        details: err.message,
      })
    } else {
      // Kesalahan umum lainnya
      res.status(500).send({
        error: "Internal Server Error",
        details: err.message,
      })
    }
  }
})

module.exports = router;