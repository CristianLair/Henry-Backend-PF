const jwt = require('jsonwebtoken')
require('dotenv').config()
const User = require('../models/user')
exports.verifyToken = async (req,res,next) =>  {

const token = req.header('x-auth-token')


//revisar si no hay token

if(!token){
    return res.status(401).json({msg:'Sin token no hay paraiso'})
}

try {
    
    const cifrado = jwt.verify(token,process.env.FIRMA);
    req.userId = cifrado.id
    
    const user = await User.findById(req.userId)

    if (!user) return res.status(404).json({ message: "Usuario inexistente" });
    next();
  } catch (error) {
    return res.status(401).json({ message: "sin autorizacion" });
  }
}




