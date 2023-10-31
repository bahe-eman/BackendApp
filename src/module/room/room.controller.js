const express = require("express");

const {
  allUsers,
  createRoom,
  deleteRoomById,
  roomById,
  editRoomById,
} = require("./room.service");

const router = express.Router();

router.get("/", async (req, res) => {
  const users = await allUsers();

  res.send(users);
});

router.post("/", async (req, res) => {
  try {
    const newData = req.body;

    const room = await createRoom(newData);

    res.send({
      data: room,
      message: "Create room success",
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.put("/:id", async (req, res) => {
  const roomId = req.params.id;
  const newData = req.body;
  if (
    !(
      newData.categoryId &&
      newData.floorId &&
      newData.nameRoom &&
      newData.numberRoom &&
      newData.statusId &&
      newData.descRoom
    )
  ) {
    return res.status(400).send("some fields are missings");
  }
  const room = await editRoomById(parseInt(roomId), newData);

  res.send({
    data: room,
    message: "Update Room success",
  });
});

router.delete("/:id", async (req, res) => {
  try {
    const roomId = req.params.id;
    await deleteRoomById(parseInt(roomId));

    res.send("Room deleted");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const roomId = parseInt(req.params.id);
    const room = await roomById(roomId);
    res.send(room);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;
