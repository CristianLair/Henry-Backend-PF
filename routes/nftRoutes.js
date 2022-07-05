const express = require('express');

const router = express.Router();

import { getAllNft, getIdNft} from '../controllers/nftGetController.js'
import {createNft} from '../controllers/nftPostController.js'

// GET all nfts
router.get('/nfts', getAllNft )
  
  // GET a single nft
  router.get('/nft/:id', getIdNft)
  
  // POST a new nft
  router.post('/nft', createNft)
  
   //testingtestingtestginggg

 //testingtestingtestginggg

module.exports = router;