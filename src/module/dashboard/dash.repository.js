const { prisma } = require("../../db/index");

const findAllInfo = async () => {
  const users = await prisma.room.findMany({
    select: {
      idRoom:true
    },where:{
      statusId:6
    }
  });
  return users;
};
const findAllCheckIn = async () => {
  const users = await prisma.transaction.findMany({
    select: {
      idTransaction:true
    },where:{
      statusTransaction:3
    }
  });
  return users;
};
const findAllCheckOut = async () => {
  const users = await prisma.transaction.findMany({
    select: {
      idTransaction:true
    },where:{
      statusTransaction:4
    }
  });
  return users;
};

module.exports = {
  findAllInfo,
  findAllCheckIn,
  findAllCheckOut
};
