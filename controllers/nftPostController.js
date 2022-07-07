 const Nft = require('../models/Nft')
 
 const createNft = async (req, res) => {
    const {name, description, image } = req.body;

    try {
        const nft = await Nft.create({name, description, image})
        res.status(200).json(nft)
    } catch (error) {
        res.status(400).json({error : error.message})
    }

}
//
module.exports = createNft