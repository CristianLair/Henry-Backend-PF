const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    secure: true,
    port: 465,
    auth: {
      user: 'cristianlair@gmail.com',
      pass: 'fqwrbcbpitnfleva',
    },
    tls: {
      rejectUnauthorized: false,
    },
  });


  module.exports = {
    transporter,
  };