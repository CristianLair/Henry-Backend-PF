require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const nftRoutes = require('./routes/nftRoutes')
const user = require('./controllers/usuarioController')
const Usuario = require('./models/user')
const authUser = require('./controllers/authController')



const conectarDB = require('./db')
conectarDB()

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
});

app.use('/')

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

//endpoint donde veremos mediante un json los usuarios

app.get('/usuariosRegistrados', (req, res) => {
  Usuario.find()
      .then((result) => {
          res.send(result)
      })
      .catch(err => res.status(404).send(err));
})

//conext to db
const PORT = process.env.PORT || 4000
        app.listen(PORT, () => {
            console.log('listening for request on port',PORT)
        })




        