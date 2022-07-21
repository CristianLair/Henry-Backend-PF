const User = require('../models/user')
const jwt = require('jsonwebtoken')
const Role = require('../models/Role')

require('dotenv').config()
const ROLES = ["user","admin"];

async function verifyToken(req, res, next) {
    try{
    const token  = req.headers["x-access-token"];
    if(!token) return res.status(403).json({msg:"No token provider"})
    next()
    const decoded = jwt.verify(token, publicKey)
    req.userId = decoded.id;
    const user = await User.findById(req.userId);

    if (!user) return res.status(404).json({ message: "No user found" });
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
}

async function isAdmin (req, res, next)  {
    try {
      const user = await User.findById(req.email);
      const roles = await Role.find({ email: { $in: user.roles } });
  
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }
  
      return res.status(403).json({ message: "Require Admin Role!" });
    } catch (error) {
      console.log(error)
      return res.status(500).send({ message: error });
    }
  }
  async function checkRolesExisted  (req, res, next) {
    if (req.body.roles) {
      for (let i = 0; i < req.body.roles.length; i++) {
        if (!ROLES.includes(req.body.roles[i])) {
          return res
            .status(400)
            .json({ message: `Role ${req.body.roles[i]} does not exist` });
        }
      }
    }
    next();
  }


module.exports = {verifyToken,isAdmin,checkRolesExisted}


