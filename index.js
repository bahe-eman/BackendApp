const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const router = require("./src/routes/router");
const path = require("path");
const PORT = process.env.PORT;
app.use(express.json());
app.use(
  cors({
    origin: "*",
  }),
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
// app.use(
//   multer({ storage: fileStorage, fileFilter: fileFilter }).single("fotoUser")
// );
app.use("/bookingAssets", express.static(__dirname + "/asset/"));
app.use("/assets/category-images", express.static("assets/category-images"));
app.use("/assets/admin", express.static("assets/admin"));
app.use("/uploads", express.static("uploads"));
app.get("/api", (req, res) => {
  res.send("Hello");
});
app.use("/", router);

// app.listen(PORT, () => {
//   console.log("Express API running in Port: " + PORT);
// });
