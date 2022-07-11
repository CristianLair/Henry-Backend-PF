const { default: axios } = require("axios");
const express = require("express");

const router = express.Router();

const Moralis = require("moralis/node");
const { getAllNft, getNameNft, getIdNft } = require("../controllers/nftGetController");
const serverUrl = "https://hzgmh0bhktiz.usemoralis.com:2053/server";
const appId = "TvlbElMKEQ3ozadXOqUAthnvVYSIKgNIIrllWHBi";
const masterKey = "bJ7z3DlllOjtYp1fRdf4ITSOXh6ewwvZEyR1nOQB";
Moralis.start({ serverUrl, appId, masterKey });

const createNft = require("../controllers/nftPostController");

// GET all nfts
router.get("/nfts/:name", getAllNft);
router.get("/nfts/", getNameNft);
router.get("/nft/:id", getIdNft);
router.post("/nft", createNft);

//
// GET a single nft by token id
// router.get("/nft/:id", getIdNft)

// POST a new nft
// router.post("/nft", createNft);

//testingtestingtestginggg

//testingtestingtestginggg

module.exports = router;
