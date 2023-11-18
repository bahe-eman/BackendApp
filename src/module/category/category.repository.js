const prisma = require("../../db/index");

const addCategory = async (req, res) => {
  try {
    const { nameCategory, descCategory, facilityCategory, price, image } =
      req.body;
    await prisma.category.create({
      data: {
        nameCategory: nameCategory.toLowerCase(),
        descCategory: descCategory,
        facilityCategory: facilityCategory,
        price: parseFloat(price),
        image: image,
      },
    });
    return res.status(200).send({ message: "add category success..." });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const allCategory = async (req, res) => {
  try {
    return res.status(200).send(
      await prisma.category.findMany({
        include: {
          room: true,
        },
      })
    );
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const categoryId = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    return res.status(200).send(
      await prisma.category.findUnique({
        where: { idCategory: id },
        include: { room: true },
      })
    );
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const categorySearch = async (req, res) => {
  try {
    return res.status(200).send(
      await prisma.category.findMany({
        where: {
          nameCategory: req.params.name,
        },
      })
    );
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const categoryDelete = async (req, res) => {
  try {
    await prisma.category.delete({
      where: { idCategory: parseInt(req.params.id) },
    });
    return res.status(200).send({ message: "delete success..." });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const categoryUpdate = async (req, res) => {
  try {
    const { nameCategory, descCategory, facilityCategory, price, image } =
      req.body;
    await prisma.category.update({
      where: { idCategory: parseInt(req.params.id) },
      data: {
        nameCategory: nameCategory.toLowerCase(),
        descCategory: descCategory,
        facilityCategory: facilityCategory,
        price: parseFloat(price),
        image: image,
      },
    });
    return res.status(200).send({ message: "updated category..." });
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
