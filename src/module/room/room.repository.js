const prisma = require("../../db/index");

const findAllUser = async () => {
  const users = await prisma.room.findMany({
    select: {
      idRoom: true,
      categoryId: true,
      floorId: true,
      nameRoom: true,
      statusId: true,
      descRoom: true,
      Status: true,
      Floor: true,
      Category: true,
      numberRoom: true,
    },
  });
  return users;
};

const findRoom = async (id) => {
  const room = await prisma.room.findUnique({
    where: {
      idRoom: id,
    },
  });
  return room;
};

const checkRoom = async (newData) => {
  const rooms = await prisma.room.findFirst({
    where: {      
      numberRoom: newData.numberRoom,
    },
  });
  return rooms;
};

const insertRoom = async (newData) => {
  const room = await prisma.room.create({
    data: {
      categoryId: newData.categoryId,
      floorId: newData.floorId,
      nameRoom: newData.nameRoom,
      numberRoom: newData.numberRoom,
      statusId: newData.statusId,
      descRoom: newData.descRoom,
    },
  });
  return room;
};

const updateRoom = async (id, newData) => {
  const room = await prisma.room.update({
    where: {
      idRoom: id,
    },
    data: {
      categoryId: newData.categoryId,
      floorId: newData.floorId,
      nameRoom: newData.nameRoom,
      numberRoom: newData.numberRoom,
      statusId: newData.statusId,
      descRoom: newData.descRoom,
    },
  });
  return room;
};

const deleteRoom = async (id) => {
  await prisma.room.delete({
    where: {
      idRoom: id,
    },
  });
};

module.exports = {
  findAllUser,
  checkRoom,
  insertRoom,
  deleteRoom,
  findRoom,
  updateRoom,
};
