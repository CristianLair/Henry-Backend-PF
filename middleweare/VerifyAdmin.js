const User=require('../models/user')
const bcryptjs = require("bcryptjs")



async function verifyAdmin(req, res, next) {
    const {email, password} = req.body;
    const user = await User.findOne({email: email});
    const passwordCorrect = await bcryptjs.compare(password,user.password)
        if(!passwordCorrect){
            return res.status(400).json({msg:'contraseña incorrecta'})
        }

    
    const found = user.roles.find(e => e == '62ce61008a8cf0b94f5c327e')



    // console.log('TOKEN DB => ', user.token)
    found ? next() : res.sendStatus(401)
}

module.exports = {verifyAdmin};