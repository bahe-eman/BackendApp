const express = require("express");
const bcrypt = require("bcrypt");
const { verifyJWT } = require("../../middlewares/verifyJWT");
const { multer, prisma } = require("../../db");
const { mkdir } = require("fs");
const {
  login,
  all,
  add,
  customerId,
  del,
  update,
} = require("./customer.repository");

mkdir("assets/customer-photo", { recursive: true }, (err) => {
  if (err) throw err;
});

const images = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "assets/customer-photo");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + "-" + file.originalname);
  },
});

const uploading = multer({ storage: images });

const paswordHashed = async (req, res, next) => {
  try {
    const { paswordCustomer } = req.body;
    req.body.paswordHashed = bcrypt.hashSync(paswordCustomer, 8);
    next();
  } catch (error) {
    console.log(req.body);
    return res.status(500).send({ message: "insert password..." });
  }
};
const validate = async (req, res, next) => {
  try {
    const { userName, paswordCustomer } = req.body;
    const getCustomer = await prisma.customer.findUnique({
      where: { userName: userName },
    });
    req.body.customer = getCustomer;
    const isValid = bcrypt.compareSync(
      paswordCustomer,
      getCustomer.paswordCustomer
    );
    if (!isValid) return res.status(401).send({ message: "check password..." });
    next();
  } catch (error) {
    return res
      .status(500)
      .send({ message: "check your password or username..." });
  }
};

const router = express.Router();
router.post("/login", validate, login);
router.get("/", all);
router.post("/add", uploading.any("fotoCustomer"), paswordHashed, add);

router.get("/:id", customerId);
// router.get("/search/:name", categorySearch);
router.delete("/delete/:id", del);
router.put("/update/:id", update);

module.exports = router;
