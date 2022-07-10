const Nft = require('../models/Nft')
const Moralis = require("moralis/node");

 const createNft = async (req, res) => {
    

    try {
        const {name, description, image } = req.body;
        
        
        const nft = await Nft.create({name, description, image })
        res.status(200).json(nft)
    } catch (error) {
        res.status(400).json({error : error.message})
    }

}
//
module.exports = createNft