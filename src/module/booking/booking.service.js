const express = require("express");
const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs");
const {
  checkUser,
  insertUser,
  insertCustomer,
} = require("./booking.repository");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.email",
  secure: false,
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
  const htmlToSend = `<!DOCTYPE html>
  <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f2f2f2;
        }
  
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #fff;
          border-radius: 5px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }
  
        .header {
          text-align: center;
          margin-bottom: 20px;
        }
  
        .header h1 {
          color: #333;
          font-size: 24px;
          margin: 0;
        }
  
        .content {
          margin-bottom: 30px;
        }
  
        .content p {
          margin: 0 0 10px;
          line-height: 1.5;
        }
  
        .footer {
          text-align: center;
        }
  
        .footer p {
          color: #999;
          font-size: 14px;
          margin: 0;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Hellow Customer!</h1>
          <h3>Berikut kami kirimkan bukti pemesanan Booking hotel Anda</h3>
        </div>
        <div class="content">
          <p>nama : ${newData.nameCustomer}</p>
          <p>Tanggal booking : ${new Date().toDateString()}.</p>
          <p>
            Silahkan datang ke hotel kami dan tunjukan
            <strong>BUKTI BOOKING</strong> ini, pada receptionist yang bertugas di
            sana.
          </p>
          <p>
            Terima Kasih sudah mempergunakan layanan kami, selamat menikmati
            liburan anda.
          </p>
        </div>
        <div class="footer">
          <p>Best regards,</p>
          <p>MyHotel Team</p>
        </div>
      </div>
    </body>
  </html>
  `;

  const mailOpstions = {
    // email admin operational
    from: "trianahilmi7@gmail.com",
    // email customer
    to: newData.emailCustomer,

    //body email :
    subject: "your hotel booking successfuly verifited ",
    html: htmlToSend,
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
