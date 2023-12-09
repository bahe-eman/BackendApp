const express = require("express");

const {
  findAllUser,
  insertRoom,
  checkRoom,
  deleteRoom,
  findRoom,
  updateRoom,
} = require("./room.repository");

const allUsers = async () => {
  const users = await findAllUser();
  return users;
};

const roomById = async (id) => {
  const room = await findRoom(id);
  if (!room) {
    throw Error("Room not found");
  }
  return room;
};

const createRoom = async (newData) => {
  const check = await checkRoom(newData);
  if (check) {
    throw Error("Room already exists");
  }

  const room = await insertRoom(newData);

  return room;
};

const editRoomById = async (id, newData) => {
  await roomById(id);

  const room = await updateRoom(id, newData);

  return room;
};

const deleteRoomById = async (id) => {
  await roomById(id);

  await deleteRoom(id);
};

module.exports = {
  allUsers,
  createRoom,
  deleteRoomById,
  roomById,
  editRoomById,
};
