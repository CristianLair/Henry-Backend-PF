const express = require('express');

const router = express.Router();


const createNft = require('../controllers/nftPostController')

// GET all nfts
router.get('/nfts' )
  
  // GET a single nft
  router.get('/nft/:id')
  
  // POST a new nft
  router.post('/nft', createNft)
  
   //testingtestingtestginggg

 //testingtestingtestginggg

module.exports = router;