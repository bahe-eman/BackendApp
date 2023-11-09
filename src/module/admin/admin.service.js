const {
  findAllUser,
  findUser,
  checkUser,
  deleteUser,
  updateUser,
  insertUser,
} = require("./admin.repository");
const fs = require("fs");
const allUsers = async () => {
  const users = await findAllUser();
  return users;
};

const userById = async (id) => {
  const users = await findUser(id);
  if (!users) {
    throw Error("User not found");
  }
  return users;
};

const createUser = async (newData, image) => {
  const check = await checkUser(newData);
  if (check) {
    throw Error("User already exists");
  }
  const user = await insertUser(newData, image);

  return user;
};

const deleteUserById = async (id) => {
  const check = await userById(id);
  if (check) {
    const imageUser = check.fotoUser;
    fs.unlink(imageUser, (err) => {
      if (err) {
        throw err;
      }

      console.log("Delete File successfully.");
    });
  }
  await deleteUser(id);
};

const editUserById = async (id, newData, image) => {
  const checkImage = await userById(id);
  if (checkImage) {
    const imgUser = checkImage.fotoUser;
    fs.unlink(imgUser, (err) => {
      if (err) {
        throw err;
      }

      console.log("Delete File successfully.");
    });
  }
  const user = await updateUser(id, newData, image);

  return user;
};

module.exports = {
  allUsers,
  userById,
  deleteUserById,
  createUser,
  editUserById,
};
