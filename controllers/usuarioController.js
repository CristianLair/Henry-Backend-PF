const User = require('../models/user')
const bcryptjs =  require ('bcryptjs');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken')
require('dotenv').config()

const createUsuario = async(req,res) => {

const errores = validationResult(req)

//
if(!errores.isEmpty()){
    return res.status(400).json({errores: errores.array()})
}

const {email,password} = req.body

try {

let usuario = User.findOne({email})//busco en la bd y si encuentra un email no lo deja registrarse nuevamente

if(!usuario){
    return res.status(400).json({msg:"Email ya registrado en la base de datos,seleccione otro"})
}
// si el email no existe en la bd procede a la creacion del usuario
usuario = new User(req.body)
//usamos bcryptjs para el hasheo de la pass => el 10 significa 10 vueltas le da al user para hashearlo.
const salt = await bcryptjs.genSalt(10)
usuario.password = await bcryptjs.hash(password,salt) // asignacion del hash a la password para evitar manipulacion de datos en el login del usuario
console.log(usuario.password)
await usuario.save()

//Creamos y firmamos con JWT 

const dataFirmada = {
    usuario:{
        _id: usuario._id // usamos _id ya que mongo genera los usuarios por defecto con el _id
    }
}


jwt.sign(dataFirmada, `${process.env.FIRMA}`,{
    expiresIn:3600, // usamos 3600 ya que si pasa este tiempo no lo firma y rechaza
},(error,token)=>{
    if(error) throw  error // si hay error lo devuelve y sino devuelve el token generado.
    res.json({token:token})
})

} catch (error) {
    console.log(error)
    res.status(404).send("Error")
}
}

module.exports = createUsuario