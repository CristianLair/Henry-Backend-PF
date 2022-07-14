require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const nftRoutes = require('./routes/nftRoutes')
const user = require('./controllers/usuarioController')
const Usuario = require('./models/user')
const authUser = require('./controllers/authController')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const pruebaRoles = require('./controllers/InitialSetup')
const {verifyToken} = require('./middleweare/VerifyToken')
const {verifyAdmin}  = require('./middleweare/VerifyAdmin')
const conectarDB = require('./db')
const {deleteUser} = require('./controllers/Admin/admin')
const {getUserById}  = require('./controllers/Admin/admin')
const {getUsersDb} = require('./controllers/Admin/admin')
const {updateAdminById} = require('./controllers/Admin/admin')
const changePassword = require('./controllers/authController')
conectarDB()
pruebaRoles()
// express app
const app = express()


app.name = 'API'

app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
})

// app.use('/')

// middleware
app.use(express.json())





app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})




// routes
app.use('/api', nftRoutes)
app.use('/registro',user)
app.use('/login',authUser)
app.get('/:id/changePassword',changePassword)

// Rutas para el admin
app.get('/admin/verify', verifyAdmin)
app.get('/admin/users', getUsersDb)
app.delete('/admin/delete',deleteUser)
app.get('/admin/:id',getUserById)
app.put('/admin/edit/:email', updateAdminById)

//endpoint donde veremos mediante un json los usuarios



//conext to db
const PORT = process.env.PORT || 4000
        app.listen(PORT, () => {
            console.log('listening for request on port',PORT)
        })




        