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

    userSchema.pre("save", async function (next) {
        if (!this.isModified("password")) {
          next(); //si no se cambio la contraseña no se hace nada
        }
        const salt = await bcrypt.genSalt(10); //rondas
        this.password = await bcrypt.hash(this.password, salt);
      });
      
      userSchema.methods.comprobarPassword = async function (passwordFormulario) {
        return await bcrypt.compare(passwordFormulario, this.password); //compara las pasword
      }

module.exports =  mongoose.model('usuarios', userSchema)



