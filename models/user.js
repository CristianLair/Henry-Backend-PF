const mongoose = require('mongoose')


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
    registro:{
        type: Date,
        default: Date.now()
    }
    

},
    {
        timestamps:true
    })

module.exports =  mongoose.model('usuarios', userSchema)



