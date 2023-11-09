const prisma = require("../../db/index");

const checkUser = async (newData) => {
  const users = await prisma.customer.findFirst({
    where: {
      emailCustomer: newData.emailCustomer,
    },
  });
  return users;
};

const insertUser = async (newData, cust) => {
  const user = await prisma.transaction.create({
    data: {
      customerId: cust,
      roomId: parseInt(newData.roomId),
      statusTransaction: 1,
      checkIn: new Date(newData.checkIn),
      checkOut: new Date(newData.checkOut),
      day: parseInt(newData.day),
      people: parseInt(newData.people),
      statusPayment: parseInt(newData.statusPayment),
      totalPayment: parseInt(newData.totalPayment),
    },
  });
  return user;
};
const insertCustomer = async (newData) => {
  const user = await prisma.customer.create({
    data: {
      nameCustomer: newData.nameCustomer,
      nikCustomer: newData.nikCustomer,
      emailCustomer: newData.emailCustomer,
      tlpnCustomer: newData.tlpnCustomer,
      addressCustomer: newData.addressCustomer,
      fotoCustomer: newData.fotoCustomer,
      paswordCustomer: newData.emailCustomer,
      statusCustomer: 1,
    },
  });
  return user;
};

module.exports = {
  checkUser,
  insertUser,
  insertCustomer,
};
