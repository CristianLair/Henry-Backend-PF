const mongoose = require('mongoose')

const Schema = mongoose.Schema

const nftSchema = new Schema({
    
    name: {
        type: String,
        required: true
    },
    description : {
        type: String,
        required : true
    },
    image : {
        type: String,
        required : true
    },
    token_address : {
        type : String,
        default : '1'
    },
    userLikes: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Usuario"
        }
      ],
     

}, {timestamps: true})

module.exports = mongoose.model('Nft', nftSchema)