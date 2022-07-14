const express = require ('express')
const router = express.Router()
const authController = require('../controllers/authController')
const {check}  = require('express-validator')

router.post('/', [
    check('email', 'se debe ingresar un email valido').isEmail().notEmpty(),
    check('password', 'el password debe contener al menos 4 caracteres').isLength({min:4}),
],

authController.autenticarUsuario
)

module.exports = router