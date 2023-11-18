const prisma = require("../../db/index");

const checkUser = async (newData) => {
  const users = await prisma.user.findFirst({
    where: {
      emailUser: newData.emailUser,
    },
  });
  return users;
};

module.exports = {
  checkUser,
};
