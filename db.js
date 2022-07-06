const mongoose = require('mongoose')
require('dotenv').config()



const conectarDB = async () => {
   //Conectando mongo
          mongoose.connect(process.env.MONGO_URI,
            {useNewUrlParser: true,
             useUnifiedTopology:true,
                
        
              }, (err) => {
                if(err){
                    console.log("error en la conexion")
                }else{
                    console.log("base de datos conectada correctamente")
                }
              } 
              
              
              
              )};



module.exports = conectarDB