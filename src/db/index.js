const { PrismaClient } = require("@prisma/client");
const multer = require("multer");

const prisma = new PrismaClient();

module.exports = { prisma, multer };
