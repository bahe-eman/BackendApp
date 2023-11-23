const { prisma } = require("../../db/index");

const findAllUser = async () => {
  const users = await prisma.floor.findMany();
  return users;
};

module.exports = {
  findAllUser,
};
