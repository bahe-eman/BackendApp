const { prisma } = require("../../db/index");
const { unlinkSync } = require("fs");

const categoryImagesDir = "assets/category-images";

const addCategory = async (req, res) => {
  try {
    const { nameCategory, descCategory, facilityCategory, price } = req.body;
    const checking = await prisma.category.findMany({
      where: { nameCategory: nameCategory },
    });
    if (checking.length > 0) {
      try {
        unlinkSync(`${req.files[0].path}`);
        unlinkSync(`${req.files[1].path}`);
      } catch (error) {
        console.log("image not found...");
      }
      return res
        .status(400)
        .send({ message: "name category has been used..." });
    }
    let image2;
    if (req.files[1]) {
      image2 = req.files[1].path;
    } else image2 = null;
    await prisma.category.create({
      data: {
        nameCategory: nameCategory.toLowerCase(),
        descCategory: descCategory,
        facilityCategory: facilityCategory,
        price: parseFloat(price),
        image: req.files[0].path,
        image2: image2,
      },
    });
    return res.status(200).send({ success: "add category success..." });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const allCategory = async (req, res) => {
  try {
    return res.status(200).send({
      categories: await prisma.category.findMany({
        include: {
          room: true,
        },
      }),
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const categoryId = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    return res.status(200).send({
      category: await prisma.category.findUnique({
        where: { idCategory: id },
        include: { room: true },
      }),
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const categorySearch = async (req, res) => {
  try {
    return res.status(200).send({
      categories: await prisma.category.findMany({
        where: {
          nameCategory: req.params.name,
        },
      }),
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const categoryDelete = async (req, res) => {
  try {
    const idCategory = parseInt(req.params.id);
    const selectedFile = await prisma.category.findUnique({
      where: { idCategory },
    });
    try {
      unlinkSync(`${selectedFile.image}`);
      unlinkSync(`${selectedFile.image2}`);
    } catch (error) {
      console.log("image not found...");
    }
    await prisma.category.delete({
      where: { idCategory },
    });
    return res.status(200).send({ success: "delete success..." });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const categoryUpdate = async (req, res) => {
  try {
    const idCategory = parseInt(req.params.id);
    const { nameCategory, descCategory, facilityCategory, price } = req.body;
    const selectedFile = await prisma.category.findUnique({
      where: { idCategory },
    });

    const checking = await prisma.category.findMany({
      where: { nameCategory: nameCategory },
    });

    if (checking.length != 0) {
      if (checking[0].idCategory != idCategory) {
        try {
          unlinkSync(`${req.files[0].path}`);
          unlinkSync(`${req.files[1].path}`);
        } catch (error) {
          console.log("image not found...");
        }
        return res
          .status(400)
          .send({ message: "name category has been used..." });
      }
    }

    try {
      unlinkSync(`${selectedFile.image}`);
      unlinkSync(`${selectedFile.image2}`);
    } catch (error) {
      console.log("image not found...");
    }

    let image2;
    if (req.files[1]) {
      image2 = req.files[1].path;
    } else image2 = null;
    await prisma.category.update({
      where: { idCategory: idCategory },
      data: {
        nameCategory: nameCategory.toLowerCase(),
        descCategory: descCategory,
        facilityCategory: facilityCategory,
        price: parseFloat(price),
        image: req.files[0].path,
        image2: image2,
      },
    });
    return res.status(200).send({ success: "updated category..." });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

module.exports = {
  addCategory,
  allCategory,
  categoryId,
  categorySearch,
  categoryDelete,
  categoryUpdate,
};
