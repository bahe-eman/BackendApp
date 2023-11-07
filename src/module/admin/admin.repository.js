const prisma = require("../../db/index");
const crypt = require("bcrypt");

const findAllUser = async () => {
  const users = await prisma.user.findMany({
    select: {
      idUser: true,
      nameUser: true,
      emailUser: true,
      passwordUser: true,
      tlpUser: true,
      addressUser: true,
      userLevel: true,
      levelUser: true,
      statusUser: true,
      userStatus: true,
      fotoUser: true,
    },
  });
  return users;
};

const findUser = async (id) => {
  const users = await prisma.user.findUnique({
    where: {
      idUser: id,
    },
  });
  return users;
};
const checkUser = async (newData) => {
  const users = await prisma.user.findFirst({
    where: {
      emailUser: newData.emailUser,
    },
  });
  return users;
};

const insertUser = async (newData, image) => {
  const hashedPwd = crypt.hashSync(newData.passwordUser, 8);
  const user = await prisma.user.create({
    data: {
      nameUser: newData.nameUser,
      emailUser: newData.emailUser,
      passwordUser: hashedPwd,
      tlpUser: newData.tlpUser,
      addressUser: newData.addressUser,
      levelUser: parseInt(newData.levelUser),
      statusUser: parseInt(newData.statusUser),
      fotoUser: image,
    },
  });
  return user;
};

const updateUser = async (id, newData, image) => {
  const hashedUpPass = crypt.hashSync(newData.passwordUser, 8);
  const product = await prisma.user.update({
    where: {
      idUser: id,
    },
    data: {
      nameUser: newData.nameUser,
      emailUser: newData.emailUser,
      passwordUser: hashedUpPass,
      tlpUser: newData.tlpUser,
      addressUser: newData.addressUser,
      levelUser: parseInt(newData.levelUser),
      statusUser: parseInt(newData.statusUser),
      fotoUser: image,
    },
  });
  return product;
};

const deleteUser = async (id) => {
  await prisma.user.delete({
    where: {
      idUser: id,
    },
  });
};

module.exports = {
  findAllUser,
  findUser,
  checkUser,
  deleteUser,
  insertUser,
  updateUser,
};
