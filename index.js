require("dotenv").config();
const authRouter = require("./routes/googleRoutes");


const express = require("express");
const mongoose = require("mongoose");
const {nftRoutes} = require('./controllers/nftGetController')
const user = require("./controllers/usuarioController");
const Usuario = require("./models/user");
const authUser = require("./controllers/authController");
const { getProfile } = require("./controllers/user/user");
const { updatedProfileById } = require("./controllers/user/user");
const pruebaRoles = require("./controllers/InitialSetup");
const { transporter } = require("./configs/mailer");
const { verifyAdmin } = require("./middleweare/VerifyAdmin");
const templatePassword = require("./routes/emails/emailPassword");
const conectarDB = require("./db");
const { deleteUser, getDBNfts } = require("./controllers/Admin/admin");
const { getUserById, updateAdminToUser } = require("./controllers/Admin/admin");
const { getUsersDb } = require("./controllers/Admin/admin");
const { updateAdminById } = require("./controllers/Admin/admin");
const changePassword = require("./controllers/authController");
const { checkRolesExisted } = require("./middleweare/VerifyToken");
const emailRecoverPassword = require("./routes/emails/emailRecoverPassword");
const templateForgottenPassword = require("./routes/emails/emailForgottenPassword");
const Review = require('./models/review')
const cors = require("cors");
const bcrypt = require("bcrypt");
const { response } = require("express");
conectarDB();
pruebaRoles();



// express app
const app = express();

app.name = "API";

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
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.get("/api", nftRoutes);
app.use("/api/registro", user, checkRolesExisted);
app.use("/api/login", authUser);
app.put("/:email/updatePassword", (req, res, next) => {
  const { email } = req.params;
  let { password } = req.body;
  bcrypt.hash(password, 10, (err, hash) => {
    password = hash;
    if (err) {
      next(err);
    }
    req.body.password = password;
    Usuario.findOne({ email: email })
      .then((response) => {
        response
          .updateOne({ password }, { where: { email } })
          .then(async () => {
            await transporter.sendMail({
              from: '"wallaby 🎲" <wallaby@gmail.com>', // sender address
              to: response.email, // list of receivers
              subject: "Recover your password", // Subject line
              html: templatePassword(response.email, "Que bueno verte"), // html body
            });
            res.send("Password Update");
          });
      })
      .catch((e) => next(e));
  });
});

app.put("/:email/newpassword", (req, res, next) => {
  const { email } = req.params;
  let { password } = req.body;
  const { confirmPassword } = req.body;
  if (password === confirmPassword) {
    bcrypt.hash(password, 10, (err, hash) => {
      password = hash;
      if (err) {
        return next(err);
      }
      req.body.password = password;
      Usuario.findOne({ email: email })
        .then((response) => {
          response
            .updateOne({ password }, { where: { email } })
            .then(async () => {
              await transporter.sendMail({
                from: '"Wallabi 🎲" <wallaby@gmail.com>', // sender address
                to: response.email, // list of receivers
                subject: "Recover your password", // Subject line
                html: emailRecoverPassword(
                  response.firstName,
                  "Saludos cordiales !"
                ), // html body
              });
              return res.send("Password Update");
            });
        })
        .catch((e) => next(e));
    });
  } else {
    return res.status(400).send("The two passwords must match");
  }
  return null;
});
app.get('/reviews',async(req,res,next)=>{


  try {
    const data = await Review.find({})
    console.log(data)
    return res.send(data)
  } catch (error) {
    return res.status(403).json({msg:"data no adquirida"})
  }
})
app.post('/:email/reviews',(req,res,next)=>{
  
  const review = new Review();
    review.email = req.body.email;
    review.rating = req.body.rating;
    review.username = req.body.username
    review.save()
    .then((result) => {
      Usuario.findOne({ email: review.email }, (err, user) => {
          if (user) {
              // The below two lines will add the newly saved review's 
              // ObjectID to the the User's reviews array field
              user.reviews.push(review);
              user.save();
              res.json({ message: 'Review created!' });
          }
      });
    })
    .catch((error) => {
      res.status(500).json({ error });
      next()
    });
    
})


app.get("/:email/recoverpassword", (req, res, next) => {

  const { email } = req.params;
  Usuario.findOne({ email: email })
    .then(async (response) => {
      if (response) {
        await transporter.sendMail({
          from: '"Wallaby 🎲" <wallaby@gmail.com>', // sender address
          to: response.email, // list of receivers
          subject: "Recover your password", // Subject line
          html: templateForgottenPassword(
            response.email,
            "Un gusto verte nuevamente !",
            email
          ), // html body
        });
        return res.send("E-mail sent");
      }
      return res.status(404).send("Account no exist");
    })
    .catch((e) => next(e));
});
app.use("/auth", authRouter);
// Rutas para el admin

app.get("/admin/verify", verifyAdmin);
app.post("/admin/users", verifyAdmin, getUsersDb);
app.delete("/admin/delete", verifyAdmin, deleteUser);
app.get("/admin/:id", verifyAdmin, getUserById);
app.put("/admin/edit/:email", verifyAdmin, updateAdminById);
app.put("/admin/edituser/:email", verifyAdmin, updateAdminToUser);
app.post("/admin/nftcreated", verifyAdmin, getDBNfts);
app.put("/admin/user/:email/status", (req, res) => {
  Usuario.findOne({email: req.params.email}, async (err, foundUser) => {
     
      try{
          
      if (foundUser.isActive === false) {
          await Usuario.findOneAndUpdate({email: req.params.email}, {$set: {isActive: true}});
         
          res.send({message: "The account has been unsuspended"})
      } else {
          await Usuario.findOneAndUpdate({email: req.params.email}, {$set: {isActive: false}});
          console.log(err);
         res.send({message: "The account has been suspended"})
      }
    }catch(err){
      console.log(err)
    }
  });
})
  

//endpoint donde veremos mediante un json los usuarios





//user
app.get("/profile/:email", getProfile);
app.put("/profile/:token", updatedProfileById);

//conext to db
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log("listening for request on port", PORT);
});

////prueba tail
