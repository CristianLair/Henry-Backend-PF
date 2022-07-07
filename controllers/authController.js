const User = require('../models/user')
const bcryptjs =  require ('bcryptjs');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.autenticarUsuario = async (req,res) => {
    const errores = validationResult(req)

    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()})
    }

    const {email,password} = req.body

    try {
        let usuario = await User.findOne({email})
        if(!usuario){
            return res.status(400).json({msg:'usuario inexistente'})
        }

        const passwordCorrect = await bcryptjs.compare(password,usuario.password)

        if(!passwordCorrect){
            return res.status(400).json({msg:'contraseña incorrecta'})
        }

        const data = {
            usuario:{
                _id:usuario.id
            }
        }

        jwt.sign(data,`${process.env.FIRMA}`, {expiresIn: 3600},
        
        (error,token) =>{
            if(error) throw error
            res.json({token:token})
        }
        )
    } catch (error) {
        console.log(error)
        res.status(404).json({msg:"error"})
    }
}
