const express = require("express");
const { verifyJWT } = require("../../middlewares/verifyJWT");
const { multer } = require("../../db");
const { mkdir } = require("fs");
const { all, add, customerId, del, update } = require("./customer.repository");

mkdir("assets/customer-images", { recursive: true }, (err) => {
  if (err) throw err;
});

const images = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "assets/customer-images");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + "-" + file.originalname);
  },
});

const uploading = multer({ storage: images });

const router = express.Router();
router.get("/", all);
router.post("/add", add);
router.get("/:id", customerId);
// router.get("/search/:name", categorySearch);
router.delete("/delete/:id", del);
router.put("/update/:id", update);

module.exports = router;
