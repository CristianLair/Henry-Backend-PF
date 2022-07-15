const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const userSchema =  mongoose.Schema({
    nombre: {
        type: "string",
        require:true,
        trim: true

    },
    email: {
        type: "string",
        trim: true,
        unique: true,
        require: true,
        lowercase:true
    },
    password:{
        type:"string",
        require:true,
        trim:true
    },

    roles: [
        {
          type: Schema.Types.ObjectId,
          ref: "Roles",
        },
        { timestamps: true, versionKey: false },
      ],
    registro:{
        type: Date,
        default: Date.now()
    }
    

},
    {
        timestamps:true
    })

   

module.exports =  mongoose.model('usuarios', userSchema)



