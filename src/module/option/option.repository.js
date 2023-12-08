const { prisma } = require("../../db/index");

const findAllUser = async () => {
  const users = await prisma.category.findMany({
    select: {
      idCategory: true,
      nameCategory:true,
      price:true
    },
  });
  return users;
};
const findAllFloor = async () => {
  const users = await prisma.floor.findMany({
    select: {
      idFloor: true,
      nameFloor:true
    },
  });
  return users;
};
const findAllRoom = async () => {
  const users = await prisma.room.findMany({
    select: {
      idRoom: true,
      nameRoom:true,
      numberRoom:true
    },
  });
  return users;
};
const findAllRoomByCat = async (categ) => {
  const users = await prisma.room.findMany({
    select: {
      idRoom: true,
      nameRoom:true,
      numberRoom:true
    }, where: {
      categoryId: categ,
    },
  });
  return users;
};
const findAllRoomByFlor = async (flor) => {
  const users = await prisma.room.findMany({
    select: {
      idRoom: true,
      nameRoom:true,
      numberRoom:true
    },where: {
      floorId: flor,
    },
  });
  return users;
};
const findAllRoomByPar = async (categ,flor) => {
  const users = await prisma.room.findMany({
    select: {
      idRoom: true,
      nameRoom:true,
      numberRoom:true
    },where: {
      categoryId: categ,
      floorId: flor,
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
  findAllRoomByPar
};
