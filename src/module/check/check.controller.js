const prisma = require("../../db/index");
const express = require("express");
const router = express.Router();
const { getAll, getOne, getOneAndUpdate } = require("./check.repository");



router.get("/in", async (req, res) => {
  try {
    const checkin = await getAll(3);
    res.send({
      data: checkin,
      message: 'get checkin success',
    })
  } catch (err) {
    // Memeriksa apakah kesalahan terkait validasi data
    if (err.name === 'ValidationError') {
      res.status(400).send({
        error: 'Invalid data',
        details: err.message,
      })
    } else {
      // Kesalahan umum lainnya
      res.status(500).send({
        error: 'Internal Server Error',
        details: err.message,
      })
    }
  }
})

router.get('/in/:customerid', async (req, res) => {
  try {
    if (isNaN(+req.params.customerid)) {
      return res.status(404).send({
        message: 'data not found',
      })
    }
    const checkin = await prisma.transaction.findMany({
      select: {
        idTransaction: true,
        customer: {
          select: {
            idCustomer: true,
            nameCustomer: true,
            addressCustomer: true,
            tlpnCustomer: true,
            emailCustomer: true,
            nikCustomer: true,
            statusCustomer: true,
          },
        },
        room: {
          select: {
            floorId: true,
            nameRoom: true,
            numberRoom: true,
          },
        },
        checkIn: true,
        checkOut: true,
        booking: true,
        payment: true,
      },
      where: {
        customer: {
          idCustomer: +req.params.customerid,
        },
      },
    })
    if (!checkin) {
      return res.status(404).send({
        message: 'data not found',
      })
    }
    res.send({
      data: checkin,
      message: 'get checkin success',
    })
  } catch (err) {
    // Memeriksa apakah kesalahan terkait validasi data
    if (err.name === 'ValidationError') {
      res.status(400).send({
        error: 'Invalid data',
        details: err.message,
      })
    } else {
      // Kesalahan umum lainnya
      res.status(500).send({
        error: 'Internal Server Error',
        details: err.message,
      })
    }
  }
});

router.get("/out", async (req, res) => {
  try {
    const checkout = await prisma.transaction.findMany({
      select: {
        idTransaction: true,
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
              statusCustomer : 4
          }
      },
  });
    res.send({
      data: checkout,
      message: 'get checkout success',
    })
  } catch (err) {
    // Memeriksa apakah kesalahan terkait validasi data
    if (err.name === 'ValidationError') {
      res.status(400).send({
        error: 'Invalid data',
        details: err.message,
      })
    } else {
      // Kesalahan umum lainnya
      res.status(500).send({
        error: 'Internal Server Error',
        details: err.message,
      })
    }
  }
});

router.get("/out/:id", async (req, res) => {
  try {
    if (isNaN(+req.params.id) ) {
      return res.status(404).send({
        message: 'data not found',
      })
    }
    const checkout = await prisma.transaction.findMany({
      select: {
        idTransaction: true,
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
              idCustomer : +req.params.id
          }
      },
  });
    if (!checkout) {
      return res.status(404).send({
        message: 'data not found',
      })
    }
    res.send({
      data: checkout,
      message: 'get checkout success',
    })
  } catch (err) {
    // Memeriksa apakah kesalahan terkait validasi data
    if (err.name === 'ValidationError') {
      res.status(400).send({
        error: 'Invalid data',
        details: err.message,
      })
    } else {
      // Kesalahan umum lainnya
      res.status(500).send({
        error: 'Internal Server Error',
        details: err.message,
      })
    }
  }
});

router.patch("/intoout/id", async (req, res) => {
  try {
    const checkin = await getOneAndUpdate(req.params.id, req.body);
    res.send({
      data: checkin,
      message: "update checkin success",
    });
  }
  catch (err) {
    // Memeriksa apakah kesalahan terkait validasi data
    if (err.name === 'ValidationError') {
      res.status(400).send({
        error: 'Invalid data',
        details: err.message,
      })
    } else {
      // Kesalahan umum lainnya
      res.status(500).send({
        error: 'Internal Server Error',
        details: err.message,
      })
    }
  }
})
router.patch("/outtofinish/id", async (req, res) => {
  try {
    const checkin = await getOneAndUpdate(req.params.id, 4, 5);
    res.send({
      data: checkin,
      message: "update checkin success",
    });
  }
  catch (err) {
    // Memeriksa apakah kesalahan terkait validasi data
    if (err.name === 'ValidationError') {
      res.status(400).send({
        error: 'Invalid data',
        details: err.message,
      })
    } else {
      // Kesalahan umum lainnya
      res.status(500).send({
        error: 'Internal Server Error',
        details: err.message,
      })
    }
  }
})




module.exports = router;
