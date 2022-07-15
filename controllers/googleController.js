// require('dotenv').config()
const axios = require('axios');
const { Router } = require('express');
const User = require('../models/user')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const router = Router();
const {GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, BACKEND_BASE_URL, JWT_SECRET_KEY} = process.env
passport.serializeUser(function (user, done) {
    done(null, user)
})

passport.deserializeUser(function (user, done) {
    done(null, user)
})

router.post("/", [
check('nombre', 'el nombre es obligatorio').notEmpty(),
check('email', 'se debe ingresar un email').isEmail(),
check('password','la contraseña debe tener al menos 4 caracteres').isLength({min:4})
],usuarioController.createUsuario)

router.post("/login", (req, res, next) => {
    User.findOne({
        where: {
            mail: req.body.email
        }
    }).then(user => {
        if (user) {
            // if (user.userType === "suspended") {
            //     return res.status(401).json({ error: "Tu cuenta se encuentra suspendida" });
            // }
            if (bcrypt.compareSync(req.body.password, user.password)) {

                let token = jwt.sign({
                    user_id: user.dataValues.id,
                    email: user.dataValues.mail,
                    user_type: user.dataValues.userType
                }, JWT_SECRET_KEY, {
                    expiresIn: 1440
                })

                res.send({
                    status: "success",
                    token: token,
                    id: user.dataValues.id
                })

            } else {
                res.status(400).send({
                    status: "error",
                    error: 'Usuario o Contraseña Incorrecta'
                })
            }
        } else {
            res.status(400).send({
                status: "error",
                error: 'Usuario o Contraseña Incorrecta'
            })
        }
    }).catch(err => {
        res.status(400).json({ status: "error", error: err.message })
        console.log(err)
    })
})

//Google

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: BACKEND_BASE_URL + "/api/auth/google/callback",
    passReqToCallback: true
},
    async function (request, accessToken, refreshToken, profile, done) {

        const [user, created] = await User.findOrCreate({
            where: {
                mail: profile.email
            },
            defaults: {
                name: profile.displayName,
                image: profile.picture,
                mail: profile.email,
                password: "oauth"
            }
        });
        done(null, user)
    }
));

router.get('/google',
    passport.authenticate('google', { session: 'false', scope: ['email', 'profile'] }));

router.get('/google/callback',
    passport.authenticate('google', { session: 'false', failureRedirect: '/login' }),
    function (req, res) {
        // Successful authentication, redirect home.


        let token = jwt.sign({
            user_id: res.req.user.dataValues.id,
            email: res.req.user.dataValues.mail,
            user_type: res.req.user.dataValues.userType
        }, JWT_SECRET_KEY, {
            expiresIn: 1440
        })

        res.redirect(FRONTEND_BASE_URL + '/home?token=' + token + '&id=' + res.req.user.dataValues.id);
    });



module.exports = router;