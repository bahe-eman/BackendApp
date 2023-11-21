const express = require("express");
const { multer } = require("../../db/index");
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
router.post("/add", uploading.single("image"), addCategory);
router.get("/:id", categoryId);
router.get("/search/:name", categorySearch);
router.delete("/delete/:id", categoryDelete);
router.put("/update/:id", validateCategory, categoryUpdate);

module.exports = router;
