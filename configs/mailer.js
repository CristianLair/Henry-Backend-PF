const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    secure: true,
    port: 465,
    auth: {
      user: 'wallabyNFT@gmail.com',
      pass: 'proyectoNFT',
    },
    tls: {
      rejectUnauthorized: false,
    },
  });


  module.exports = {
    transporter,
  };