const { prisma } = require("../../db/index");

const getAll = async (status) => {
  return await prisma.transaction.findMany({
    select: {
      customer: {
        select: {
          idCustomer: true,
          nikCustomer: true,
          nameCustomer: true,
          statusId: true,
        },
      },
      room: {
        select: {
          floorId: true,
          nameRoom: true,
        },
      },
      checkIn: true,
      checkOut: true,
      status: {
        select: {
          idStatus: true,
          nameStatus: true,
        },
      },
    },
    where: {
      status: {
        idStatus: status,
      },
    },
  });
};
const getOne = async (status, id) => {
  return await prisma.transaction.findUnique({
    select: {
      customer: {
        select: {
          idCustomer: true,
          nameCustomer: true,
          addressCustomer: true,
          tlpnCustomer: true,
          emailCustomer: true,
          nikCustomer: true,
          statusId: true,
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
        idCustomer: id,
        statusId: status,
      },
    },
  });
};

const getOneAndUpdate = async (id, status, newData) => {
  const data = await getOne(status, id);
  if (!data) {
    return null;
  }
  const updatedData = await prisma.customer.update({
    where: {
      idTransaction: id,
    },
    data: {
      statusId: newData,
    },
  });
  return updatedData;
};

module.exports = {
  getAll,
  getOne,
  getOneAndUpdate,
};
