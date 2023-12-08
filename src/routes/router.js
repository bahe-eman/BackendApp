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
const { verifyJWT } = require("../middlewares/verifyJWT");
const customerController = require("../module/customer/customer.controller");
const optionController = require("../module/option/option.controller");

router.use("/login", ValidateLogin, loginController);
router.use("/users", verifyJWT, userController);
router.use("/rooms", verifyJWT, roomController);
router.use("/category", verifyJWT, categoryController);
router.use("/floor", verifyJWT, floorController);
router.use("/booking", verifyJWT, bookingController);
router.use("/reports", verifyJWT, reportController);
router.use("/customer", verifyJWT, customerController);
router.use("/check", verifyJWT, checkController);
router.use("/option", optionController);

module.exports = router;
