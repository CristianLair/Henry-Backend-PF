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
    username: {
        type: String,
    },
    isActive: {
      type: Boolean,
      default: true
  },
    lastName:{type:String},
    description: {type:String},
    profilePic: {type:String},
    token: {type: String},
    googleID: {type: String},

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
    },
    nftLikes:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "NftCreated",
      }],
      ranking: {
        type: Number,
        trim: true,
        default: 0
      },
      reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
}, {
  toJSON: {
    virtuals: true,
  },
      
},

    {
        timestamps:true
    })

   

module.exports =  mongoose.model('usuarios', userSchema)



