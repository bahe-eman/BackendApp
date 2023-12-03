const {
  findAllUser,
  findUser,
  checkUser,
  deleteUser,
  updateUser,
  insertUser,
} = require("./admin.repository");
const validator = require("validator");
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
const createUser = async (req, res) => {
  try {
    const newData = req.body;
    const strongPassword = validator.isStrongPassword(newData.passwordUser);
    if (!strongPassword) {
      return res.status(400).send({ message: "password not strong" });
    }
    if (!req.file) {
      return res.status(422).send({ message: "image must be uploaded" });
    }
    const image = req.file.path;
    const user = await checkCreateUser(newData, image);

    res.send({
      data: user,
      message: "create Users success",
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
};
const userUpdate = async (req, res) => {
  try {
    const userId = req.params.id;
    const newData = req.body;
    if (
      !(
        newData.nameUser &&
        newData.emailUser &&
        newData.passwordUser &&
        newData.tlpUser &&
        newData.addressUser &&
        newData.levelUser &&
        newData.statusUser
      )
    ) {
      return res.status(400).send("some fields are missings");
    }
    const strongPassword = validator.isStrongPassword(newData.passwordUser);
    if (!strongPassword) {
      return res.status(400).send({ message: "password not strong" });
    }
    if (!req.file) {
      return res.status(422).send({ message: "image must be uploaded" });
    }
    const image = req.file.path;
    const user = await editUserById(parseInt(userId), newData, image);

    res.send({
      data: user,
      message: "Update User success",
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
};
const checkCreateUser = async (newData, image) => {
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
  userUpdate,
};
