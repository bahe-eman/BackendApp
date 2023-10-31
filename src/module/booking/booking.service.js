const nodemailer = require("nodemailer");
const {
  checkUser,
  insertUser,
  insertCustomer,
} = require("./booking.repository");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "trianahilmi7@gmail.com",
    pass: "ohlnrcjzmtcwcdme",
  },
});

const createUser = async (newData) => {
  const check = await checkUser(newData);
  if (check) {
    var cust = check.idCustomer;
  } else {
    const custInsert = await insertCustomer(newData);
    var cust = custInsert.idCustomer;
  }
  const user = await insertUser(newData, cust);
  const mailOpstions = {
    from: "trianahilmi7@gmail.com",
    to: "trianahilmi5@gmail.com",
    subject: "Node Mailer TEST",
    text: "Test Sending Email Using NodeJs",
  };

  transporter.sendMail(mailOpstions, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log("Email Sent: " + info.response);
    }
  });
  return user;
};

module.exports = {
  createUser,
};
