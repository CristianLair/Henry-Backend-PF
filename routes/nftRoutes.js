const express = require('express');

const router = express.Router();

const Moralis = require('moralis/node');
const serverUrl = "https://hzgmh0bhktiz.usemoralis.com:2053/server"
const appId = "TvlbElMKEQ3ozadXOqUAthnvVYSIKgNIIrllWHBi"
const masterKey = 'bJ7z3DlllOjtYp1fRdf4ITSOXh6ewwvZEyR1nOQB'
Moralis.start({ serverUrl, appId , masterKey});


const createNft = require('../controllers/nftPostController')

// GET all nfts
router.get('/nfts/', async (req, res) => {
  const {type} = req.params
    
    try {
        const options = { q: "cat" , chain: "bsc", filter: "name" };
        const NFTs = await Moralis.Web3API.token.searchNFTs(options);
        const filterNfts = NFTs.result;
        await filterNfts.map((data)=> data.metadata.metadata)
        res.status(200).json(filterNfts)
        
    } catch (error) {
        console.log(error)
    }
} )
   //
  // GET a single nft
  router.get('/nft/:id')
  
  // POST a new nft
  router.post('/nft', createNft)
  
   //testingtestingtestginggg

 //testingtestingtestginggg

module.exports = router;