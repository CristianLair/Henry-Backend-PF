const { default: axios } = require("axios");
const express = require("express");

const router = express.Router();

const Moralis = require("moralis/node");
const { getAllNft, getNameNft, getPayment } = require("../controllers/nftGetController");
const {getNftsComplete, getNftId} = require('../controllers/pruebaController')
const serverUrl = "https://hzgmh0bhktiz.usemoralis.com:2053/server";
const appId = "TvlbElMKEQ3ozadXOqUAthnvVYSIKgNIIrllWHBi";
const masterKey = "bJ7z3DlllOjtYp1fRdf4ITSOXh6ewwvZEyR1nOQB";
Moralis.start({ serverUrl, appId, masterKey });

const createNft = require("../controllers/nftPostController");

// GET all nfts
router.get("/nfts/:name", getAllNft);
router.get("/nfts/", getNameNft);
router.get('/tests', getNftsComplete);
router.get('/tests/nftid', getNftId);
router.post("/nft", createNft);
router.get('/payment', getPayment);


//
// GET a single nft by token id
// router.get("/nft/:id", getIdNft)

// POST a new nft
// router.post("/nft", createNft);

//testingtestingtestginggg

//testingtestingtestginggg

module.exports = router;
