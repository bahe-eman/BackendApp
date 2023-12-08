const {
  findAllInfo,
  findAllCheckIn,
  findAllCheckOut
} = require("./dash.repository");

const allInfo = async () => {
  const users = await findAllInfo();
  const checkIn = await findAllCheckIn();
  const checkout = await findAllCheckOut();
  const data = {"room": users.length,"checkIn":checkIn.length,"checkOut":checkout.length}
  return data;
};

module.exports = {
  allInfo,
};
