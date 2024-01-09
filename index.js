const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const router = require("./src/routes/router");
const { prisma } = require("./src/db");
const bcrypt = require("bcrypt");
const path = require("path");
const PORT = process.env.PORT;
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
const multer = require("multer");
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + "-" + file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use("/bookingAssets", express.static(__dirname + "/asset/"));
app.use("/assets/category-images", express.static("assets/category-images"));
app.use("/assets/admin", express.static("assets/admin"));
app.use("/uploads", express.static("uploads"));

app.use("/", router);

const starting = async () => {
  const checkingSuper = await prisma.role.findMany({
    where: { nameLevel: "superadmin" },
  });
  if (checkingSuper.length == 0) {
    await prisma.role.create({
      data: {
        nameLevel: "superadmin",
        message: "superadmin",
      },
    });
  }
  const checkingAdmin = await prisma.role.findMany({
    where: { nameLevel: "admin" },
  });
  if (checkingAdmin.length == 0) {
    await prisma.role.create({
      data: {
        nameLevel: "admin",
        message: "admin",
      },
    });
  }

  const active = await prisma.status.findMany({
    where: { nameStatus: "active" },
  });
  if (active.length == 0) {
    await prisma.status.create({
      data: {
        nameStatus: "active",
      },
    });
  }
  const nonActive = await prisma.status.findMany({
    where: { nameStatus: "non active" },
  });
  if (nonActive.length == 0) {
    await prisma.status.create({
      data: {
        nameStatus: "non active",
      },
    });
  }

  const admin = await prisma.user.findMany({
    where: { nameUser: "admin" },
  });
  if (admin.length == 0) {
    await prisma.user.create({
      data: {
        nameUser: "admin",
        emailUser: "admin@gmail.com",
        passwordUser: bcrypt.hashSync("Admin@12345", 8),
        tlpUser: "022-23454",
        addressUser: "Indonesia",
        roleUser: 2,
        statusUser: 1,
        fotoUser: "",
      },
    });
  }

  const superAdmin = await prisma.user.findMany({
    where: { nameUser: "superadmin" },
  });
  if (superAdmin.length == 0) {
    await prisma.user.create({
      data: {
        nameUser: "superadmin",
        emailUser: "superadmin@gmail.com",
        passwordUser: bcrypt.hashSync("Superadmin@12345", 8),
        tlpUser: "022-23454",
        addressUser: "Indonesia",
        roleUser: 1,
        statusUser: 1,
        fotoUser: "",
      },
    });
  }
};
starting();

app.listen(PORT, () => {
  console.log("Express API running in Port: " + PORT);
});
