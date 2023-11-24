const express = require("express");
const { multer } = require("../../db/index");
const { validateCategory } = require("../../middlewares/validator");
const {
  addCategory,
  allCategory,
  categoryId,
  categorySearch,
  categoryDelete,
  categoryUpdate,
} = require("./category.repository");

const router = express.Router();
router.get("/", allCategory);
router.post("/add", addCategory);
router.get("/:id", categoryId);
router.get("/search/:name", categorySearch);
router.delete("/delete/:id", categoryDelete);
router.put("/update/:id", categoryUpdate);

module.exports = router;
