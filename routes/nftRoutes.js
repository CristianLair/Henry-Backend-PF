const { default: axios } = require("axios");
const express = require("express");

const router = express.Router();

const Moralis = require("moralis/node");
const { getAllNft, getNameNft, getIdNft, findNftIdDb } = require("../controllers/nftGetController");
const {getNftsComplete} = require('../controllers/pruebaController')
const serverUrl = "https://hzgmh0bhktiz.usemoralis.com:2053/server";
const appId = "TvlbElMKEQ3ozadXOqUAthnvVYSIKgNIIrllWHBi";
const masterKey = "bJ7z3DlllOjtYp1fRdf4ITSOXh6ewwvZEyR1nOQB";
Moralis.start({ serverUrl, appId, masterKey });

const createNft = require("../controllers/nftPostController");

// GET all nfts
router.get("/nfts/:name", getAllNft);
router.get("/nfts/", getNameNft);
router.get("/nft/:id", getIdNft);
router.get('/tests', getNftsComplete )
router.post("/nft", createNft);
router.get('/nftss/:id', findNftIdDb)

//
// GET a single nft by token id
// router.get("/nft/:id", getIdNft)

// POST a new nft
// router.post("/nft", createNft);

//testingtestingtestginggg

//testingtestingtestginggg

module.exports = router;
