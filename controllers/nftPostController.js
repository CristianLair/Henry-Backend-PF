const Nft = require('../models/Nft')
const Moralis = require("moralis/node");
const serverUrl = "https://hzgmh0bhktiz.usemoralis.com:2053/server";
const appId = "TvlbElMKEQ3ozadXOqUAthnvVYSIKgNIIrllWHBi";
const masterKey = "bJ7z3DlllOjtYp1fRdf4ITSOXh6ewwvZEyR1nOQB";
Moralis.start({ serverUrl, appId, masterKey });
 
 const createNft = async (req, res) => {
    

    try {
        const {name, description, image } = req.body;
        const data = image.files[0];
        const imageFile = new Moralis.File(data.name, data)
        await imageFile.saveIPFS()
        const imageURI = imageFile.ipfs();
        
        const nft = await Nft.create({name, description, imageURI})
        res.status(200).json(nft)
    } catch (error) {
        res.status(400).json({error : error.message})
    }

}
//
module.exports = createNft