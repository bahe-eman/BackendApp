const { prisma } = require("../../db/index");

const findAllUser = async () => {
  const users = await prisma.category.findMany({
    select: {
      idCategory: true,
      nameCategory: true,
      price: true,
    },
  });
  return users;
};
const findAllFloor = async () => {
  const users = await prisma.floor.findMany({
    select: {
      idFloor: true,
      nameFloor: true,
    },
  });
  return users;
};
const findAllRoom = async () => {
  const users = await prisma.room.findMany({
    select: {
      idRoom: true,
      nameRoom: true,
      numberRoom: true,
    },
    where: {
      statusId: 6,
    },
  });
  return users;
};
const findAllRoomByCat = async (categ) => {
  const users = await prisma.room.findMany({
    select: {
      idRoom: true,
      nameRoom: true,
      numberRoom: true,
    },
    where: {
      categoryId: categ,
      statusId: 6,
    },
  });
  return users;
};
const findAllRoomByFlor = async (flor) => {
  const users = await prisma.room.findMany({
    select: {
      idRoom: true,
      nameRoom: true,
      numberRoom: true,
    },
    where: {
      floorId: flor,
      statusId: 6,
    },
  });
  return users;
};
const findAllRoomByPar = async (categ, flor) => {
  const users = await prisma.room.findMany({
    select: {
      idRoom: true,
      nameRoom: true,
      numberRoom: true,
    },
    where: {
      categoryId: categ,
      floorId: flor,
      statusId: 6,
    },
  });
  return users;
};

const findAllPaymentStatus = async () => {
  const users = await prisma.payment.findMany({
    select: {
      idPayment: true,
      paymentStatus: true,
    },
  });
  return users;
};

const findAllCatByCat = async (categ) => {
  const users = await prisma.category.findMany({
    select: {
      idCategory: true,
      nameCategory: true,
      price: true,
    },
    where: {
      idCategory: categ,
    },
  });
  return users;
};

module.exports = {
  findAllUser,
  findAllFloor,
  findAllRoomByCat,
  findAllRoom,
  findAllRoomByFlor,
  findAllRoomByPar,
  findAllPaymentStatus,
  findAllCatByCat,
};
