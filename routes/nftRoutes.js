const { default: axios } = require("axios");
const express = require("express");

const router = express.Router();

const Moralis = require("moralis/node");
const { getAllNft, getNameNft, getIdNft } = require("../controllers/nftGetController");
const {getNftsComplete, getNftId} = require('../controllers/pruebaController')
const serverUrl = "https://hzgmh0bhktiz.usemoralis.com:2053/server";
const appId = "TvlbElMKEQ3ozadXOqUAthnvVYSIKgNIIrllWHBi";
const masterKey = "bJ7z3DlllOjtYp1fRdf4ITSOXh6ewwvZEyR1nOQB";
Moralis.start({ serverUrl, appId, masterKey });

const createNft = require("../controllers/nftPostController");


router.get("/nfts/:name", getAllNft);
router.get("/nfts/", getNameNft);
router.get("/nft/id", getIdNft);
router.get('/tests', getNftsComplete );
router.get('/tests/nftid', getNftId);
router.post("/nft", createNft);


// router.get("/atribute",)
//testingtestingtestginggg

//testingtestingtestginggg

module.exports = router;
