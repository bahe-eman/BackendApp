const express = require("express");
const router = express.Router();
const userController = require("../module/admin/admin.controller");
const roomController = require("../module/room/room.controller");
const categoryController = require("../module/category/category.controller");
const floorController = require("../module/floor/floor.controller");
const bookingController = require("../module/booking/booking.controller");
const loginController = require("../module/login/login.controller");
const reportController = require("../module/report/report.controller");
const checkController = require("../module/check/check.controller");
const { ValidateLogin } = require("../middlewares/validator");
const customerController = require("../module/customer/customer.controller");

router.use("/login", ValidateLogin, loginController);
router.use("/users", userController);
router.use("/rooms", roomController);
router.use("/category", categoryController);
router.use("/floor", floorController);
router.use("/booking", bookingController);
router.use("/reports", reportController);
router.use("/customer", customerController);
router.use("/check", checkController);

module.exports = router;
