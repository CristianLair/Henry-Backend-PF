// const { all } = require("../routes/nftRoutes");
const Moralis = require("moralis/node");
const { stringify } = require("uuid");
const serverUrl = "https://hzgmh0bhktiz.usemoralis.com:2053/server";
const appId = "TvlbElMKEQ3ozadXOqUAthnvVYSIKgNIIrllWHBi";
const masterKey = "bJ7z3DlllOjtYp1fRdf4ITSOXh6ewwvZEyR1nOQB";
const nftSchema = require("../models/Nft.js");
const mongoose = require("mongoose");
Moralis.start({ serverUrl, appId, masterKey });

//filtrar los nfts que no tengan imagen quye no paarecescan ni gif
// que no se repita la imagen, como hacer que no se repita los elementros de un array

//params vacio traiga bichos aleatorios, si tarda mucho meten un loading
//

const getAllNft = async (req, res) => {
  const name = req.params.name;
  if (req.params.name && req.params.name.length >= 3) {
    try {
      const cursor = req.query.cursor ? req.query.cursor : null;

      const respuesta = [];

      const options = {
        q: name,
        chain: "eth",
        filter: "global",
        cursor: cursor,
      };
      const NFTs = await Moralis.Web3API.token.searchNFTs(options);
      respuesta.push({
        page: NFTs.page,
        totalPage: Math.ceil(NFTs.total / NFTs.page_size),
        cursor: NFTs.cursor,
      });
      console.log(
        `Got page ${NFTs.page} of ${Math.ceil(NFTs.total / NFTs.page_size)}, ${
          NFTs.total
        } total`
      );

      for (let nft of NFTs.result) {
        const metadata = JSON.parse(nft.metadata);
        const link = metadata.image ? metadata.image.slice(0, 4) : null;
        if (
          link === "ipfs" ||
          link === "data" ||
          link === null ||
          metadata.name === Number ||
          metadata.description === "" ||
          metadata.description === Number
        )
          continue;
        respuesta.push({
          _id: nft.token_id,
          token_address: nft.token_address,
          name: metadata.name,
          description: metadata.description,
          image: metadata.image,
        });
      }
      const getDbNfts = (async) => {
        const allnfts = nftSchema.find({}).sort({ createdAt: -1 });
        return allnfts;
      };
      var dbnfts = await getDbNfts();

      const DBFILTERED = dbnfts.map((nft) => {
        return {
          _id: nft._id,
          image: nft.image,
          description: nft.description,
          name: nft.name,
        };
      });

      if (respuesta[0].page === 0) {
        var finalContent = [...respuesta, ...DBFILTERED];
      } else {
        var finalContent = [...respuesta];
      }

      res.status(200).json(finalContent);

      if (finalContent.length < 1) {
        return res
          .status(404)
          .json({ error: "there's not NFTs in that parameter" });
      }

      console.log(respuesta.length);
      res.status(200).send(respuesta);
    } catch (error) {
      console.log(error);
    }
  } else {
    if (!req.query.name && !req.params.name) {
      // const options = { q: name, chain: "bsc", filter: "name" };
      // const NFTs = await Moralis.Web3API.token.searchNFTs(options);
      // const NftsResults = NFTs.result.map((nft) => Number(nft.token_id));

      return res.status(404).json({ error: "the input is empty" });
    } else if (req.params.name.length < 3) {
      return res.status(404).json({
        error: "the parameter must have a minimum length of 3 characters",
      });
    }
  }
};

const getNameNft = async (req, res) => {
  const { name } = req.query;
  if (req.query.name && req.query.name.length >= 3) {
    try {
      const cursor = req.query.cursor ? req.query.cursor : null;

      const respuesta = [];

      const options = {
        q: name,
        chain: "eth",
        filter: "name",
        cursor: cursor,
      };
      const NFTs = await Moralis.Web3API.token.searchNFTs(options);
      respuesta.push({
        page: NFTs.page,
        totalPage: Math.ceil(NFTs.total / NFTs.page_size),
        cursor: NFTs.cursor,
      });
      console.log(
        `Got page ${NFTs.page} of ${Math.ceil(NFTs.total / NFTs.page_size)}, ${
          NFTs.total
        } total`
      );

      for (let nft of NFTs.result) {
        const metadata = JSON.parse(nft.metadata);
        const nulll = metadata.description
          ? metadata.description.slice(0, 4)
          : null;
        const link = metadata.image ? metadata.image.slice(0, 4) : null;
        if (
          link === "ipfs" ||
          link === "data" ||
          link === null ||
          metadata.name === Number ||
          metadata.description === "" ||
          metadata.description === Number ||
          metadata.description === nulll
        )
          continue;
        respuesta.push({
          _id: nft.token_id,
          token_address: nft.token_address,
          name: metadata.name,
          description: metadata.description,
          image: metadata.image,
        });
      }
      const getDbNfts = (async) => {
        const allnfts = nftSchema
          .find({ name: { $regex: ".*" + req.query.name + "*." } })
          .sort({ createdAt: -1 });
        return allnfts;
      };
      var dbnfts = await getDbNfts();

      const DBFILTERED = dbnfts.map((nft) => {
        return {
          _id: nft._id,
          image: nft.image,
          description: nft.description,
          name: nft.name,
        };
      });

      if (respuesta[0].page === 0) {
        var finalContent = [...respuesta, ...DBFILTERED];
      } else {
        var finalContent = [...respuesta];
      }

      if (finalContent.length < 1) {
        return res
          .status(404)
          .json({ error: "there're not NFTs in that query" });
      }

      res.status(200).json(finalContent);
    } catch (error) {
      console.log(error);
    }
  } else {
    if (!req.query.name && !req.params.name) {
      return res.status(404).json({ error: "The input or parameter is empty" });
    } else if (req.query.name.length < 3) {
      return res.status(404).json({
        error: "The input must have a minimum length of 3 characters",
      });
    }
  }
};

const getIdNft = async (req, res) => {
  try {
    const { id, token_address } = req.query;

    if (token_address === "1") {
      //buscar en db
      const nftBd = await nftSchema.findById(id);
      res.status(200).send(nftBd);
    } else {
      //buscar en api moralis

      const options = {
        address: token_address,
        token_id: id,
        chain: "eth",
      };
      const nft = await Moralis.Web3API.token.getTokenIdMetadata(options);
      const metadata = JSON.parse(nft.metadata);
      const respuesta = {
        token_address: nft.token_address,
        _id: nft.token_id,
        owner_of: nft.owner_of,
        collection: nft.name,
        symbol: nft.symbol,
        name: metadata.name,
        description: metadata.description,
        image: metadata.image,
      };
      res.status(200).send(respuesta);
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = {
  getAllNft,
  getIdNft,
  getNameNft,
};
