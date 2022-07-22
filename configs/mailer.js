const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    secure: true,
    port: 465,
    auth: {
      user: 'ecomercewallaby@gmail.com',
      pass: 'ejblqznslpjsucqf',
    },
    tls: {
      rejectUnauthorized: false,
    },
  });


  module.exports = {
    transporter,
  };