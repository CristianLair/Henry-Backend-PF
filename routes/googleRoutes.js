const express = require("express");
const router = express.Router();

// Controllers
const AuthController = require("../controllers/authGoogleController");

 

// Dos rutas: login y registro
// /api/singin & /api/singup
router.post("/api/signin", AuthController.signIn);
router.post("/api/signup", AuthController.signUp);



module.exports = router;