const express = require("express");
const router = express.Router();
const userController = require("../module/admin/admin.controller");
const roomController = require("../module/room/room.controller");
const categoryController = require("../module/category/category.controller");
const floorController = require("../module/floor/floor.controller");
const bookingController = require("../module/booking/booking.controller");
const loginController = require("../module/login/login.controller");
const reportController = require("../module/report/report.controller");
const { ValidateLogin } = require("../middlewares/validator");

router.use("/login", ValidateLogin, loginController);
router.use("/users", userController);
router.use("/rooms", roomController);
router.use("/category", categoryController);
router.use("/floor", floorController);
router.use("/booking", bookingController);
router.use("/reports", reportController);

module.exports = router;
