const Users = require('../../models/user')


async function getUsersDb(_req, res, next) {
    try {
      const users = await Users.find({ roles: "62ce49c24d1d60a22f793b21" });   
      return res.send(users);
    } catch (err) {
      console.log(err,'no sos usuario admin');
    }
  }


  module.exports = {getUsersDb}