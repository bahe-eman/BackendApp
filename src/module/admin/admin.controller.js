const express = require("express");
const { multer } = require("../../db/index");
const validator = require("validator");
const {
  allUsers,
  userById,
  deleteUserById,
  createUser,
  editUserById,
  userUpdate,
} = require("./admin.service");
const router = express.Router();
const images = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "assets/admin");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + "-" + file.originalname);
  },
});

const uploading = multer({ storage: images });

router.get("/", async (req, res) => {
  try {
    const users = await allUsers();

    res.status(200).send(users);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});
router.post("/add", uploading.single("fotoUser"), createUser);
// router.post("/", async (req, res) => {
//   try {
//     const newData = req.body;
//     const strongPassword = validator.isStrongPassword(newData.passwordUser);
//     if (!strongPassword) {
//       return res.status(400).send({ message: "password not strong" });
//     }
//     if (!req.file) {
//       return res.status(422).send({ message: "image must be uploaded" });
//     }
//     const image = req.file.path;
//     const user = await createUser(newData, image);

//     res.send({
//       data: user,
//       message: "create Users success",
//     });
//   } catch (err) {
//     res.status(400).send(err.message);
//   }
// });
router.put("/update/:id", uploading.single("fotoUser"), userUpdate);
// router.put("/:id", async (req, res) => {
//   const userId = req.params.id;
//   const newData = req.body;
//   if (
//     !(
//       newData.nameUser &&
//       newData.emailUser &&
//       newData.passwordUser &&
//       newData.tlpUser &&
//       newData.addressUser &&
//       newData.levelUser &&
//       newData.statusUser
//     )
//   ) {
//     return res.status(400).send("some fields are missings");
//   }
//   const strongPass = validator.isStrongPassword(newData.passwordUser);
//   if (!strongPass) {
//     return res.status(400).send({ message: "password not strong" });
//   }
//   if (!req.file) {
//     return res.status(422).send({ message: "image must be uploaded" });
//   }
//   const image = req.file.path;
//   const user = await editUserById(parseInt(userId), newData, image);

//   res.send({
//     data: user,
//     message: "Update User success",
//   });
// });
router.patch("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const newData = req.body;
    const strongPassUpdate = validator.isStrongPassword(newData.passwordUser);
    if (!strongPassUpdate) {
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
});
router.delete("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    await deleteUserById(parseInt(userId));

    res.send("User deleted");
  } catch (err) {
    res.status(400).send(err.message);
  }
});
router.get("/:id", async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const users = await userById(userId);
    res.send(users);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;
