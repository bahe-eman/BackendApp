const { prisma } = require("../../db/index");

const findAllUser = async () => {
  const users = await prisma.room.findMany();
  return users;
};

module.exports = {
  findAllUser,
};
