const express = require('express');

const router = express.Router();

// GET all nfts
router.get('/nfts', (req, res) => {
    res.json({mssg: 'GET all nfts'})
  })
  
  // GET a single nft
  router.get('/nft/:id', (req, res) => {
    res.json({mssg: 'GET a single nft'})
  })
  
  // POST a new nft
  router.post('/nft', (req, res) => {
    res.json({mssg: 'POST a new nft'})
  })
  
 

module.exports = router;