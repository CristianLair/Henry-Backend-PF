require('dotenv').config()
const authRouter = require("./routes/googleRoutes");
const express = require('express')
const mongoose = require('mongoose')
const nftRoutes = require('./routes/nftRoutes')
const user = require('./controllers/usuarioController')
const Usuario = require('./models/user')
const authUser = require('./controllers/authController')
const {getProfile} = require('./controllers/user/user')
const {updatedProfileById} =require('./controllers/user/user')
const pruebaRoles = require('./controllers/InitialSetup')
const {transporter} = require('./configs/mailer')
const {verifyAdmin}  = require('./middleweare/VerifyAdmin')
const templatePassword = require('./routes/emails/emailPassword')
const conectarDB = require('./db')
const {deleteUser} = require('./controllers/Admin/admin')
const {getUserById}  = require('./controllers/Admin/admin')
const {getUsersDb} = require('./controllers/Admin/admin')
const {updateAdminById} = require('./controllers/Admin/admin')
const changePassword = require('./controllers/authController')
const { checkRolesExisted} = require('./middleweare/VerifyToken')
// const {isAdmin} = require('./middleweare/VerifyToken')
const cors = require('cors')
const bcrypt = require('bcrypt')
conectarDB()
pruebaRoles()
// express app
const app = express()


app.name = 'API'

app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

// app.use('/')

// middleware
app.use(express.json())





app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})




// routes
app.use('/api', nftRoutes)
app.use('/api/registro',user,checkRolesExisted)
app.use('/api/login',authUser)
app.put('/:id/updatePassword', (req, res, next) => {
  const { id } = req.params;
  let { password } = req.body;
  bcrypt.hash(password, 10, (err, hash) => {
    password = hash;
    if (err) {
      next(err);
    }
    req.body.password = password;
    Usuario.findById(id)
      .then((response) => {
        response.updateOne({ password }, { where: { id } })
          .then(async () => {
            await transporter.sendMail({
              from: '"wallaby 🎲" <wallaby@gmail.com>', // sender address
              to: response.email, // list of receivers
              subject: 'Recover your password', // Subject line
              html: templatePassword(response.email,"Que bueno verte"), // html body
            });
            res.send('Password Update');
          });
      }).catch((e) => next(e));
  });
});
app.use("/auth", authRouter);
// Rutas para el admin
app.get('/admin/verify', verifyAdmin)
app.get('/admin/users', verifyAdmin,getUsersDb)
app.delete('/admin/delete',verifyAdmin,deleteUser)
app.get('/admin/:id',verifyAdmin,getUserById)
app.put('/admin/edit/:email',verifyAdmin, updateAdminById)

//endpoint donde veremos mediante un json los usuarios

//user
app.get("/profile/:email", getProfile);
app.put("/profile/:token", updatedProfileById)

//conext to db
const PORT = process.env.PORT || 4000
        app.listen(PORT, () => {
            console.log('listening for request on port',PORT)
          })




//prueba tail