const express = require('express');
const router = express.Router();
const usuarioController = require('../controller/usuarioController');
const { check } = require('express-validator');


router.post('/', [
    check('nombre', 'el nombre es obligatorio').notEmpty(),
    check('email', 'se debe ingresar un email').isEmail(),
    check('password','la contraseña debe tener al menos 4 caracteres').isLength({min:4})
],usuarioController.createUsuario)

module.exports = router
