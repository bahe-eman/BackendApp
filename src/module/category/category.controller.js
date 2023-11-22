const express = require("express");
const { multer } = require("../../db/index");
const { mkdir } = require("fs");
const { validateCategory } = require("../../middlewares/validator");
const { verifyJWT } = require("../../middlewares/verifyJWT");
const {
  addCategory,
  allCategory,
  categoryId,
  categorySearch,
  categoryDelete,
  categoryUpdate,
} = require("./category.repository");

mkdir("src/asset/category-images", { recursive: true }, (err) => {
  if (err) throw err;
});

const images = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/asset/category-images");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + "-" + file.originalname);
  },
});

const uploading = multer({ storage: images });

const router = express.Router();
router.get("/", allCategory);
router.post("/add", uploading.any("image", "image2"), addCategory);
router.get("/:id", categoryId);
router.get("/search/:name", categorySearch);
router.delete("/delete/:id", categoryDelete);
router.put("/update/:id", uploading.any("image", "image2"), categoryUpdate);

module.exports = router;
