// const { all } = require("../routes/nftRoutes");
const Moralis = require("moralis/node");
const serverUrl = "https://hzgmh0bhktiz.usemoralis.com:2053/server";
const appId = "TvlbElMKEQ3ozadXOqUAthnvVYSIKgNIIrllWHBi";
const masterKey = "bJ7z3DlllOjtYp1fRdf4ITSOXh6ewwvZEyR1nOQB";
Moralis.start({ serverUrl, appId, masterKey });

const getAllNft = async (req, res) => {
  const name = req.params.name;
  if (req.params.name && req.params.name.length >= 3) {
    const options = { q: name, chain: "bsc", filter: "name" };
    const NFTs = await Moralis.Web3API.token.searchNFTs(options);
    const NftsResults = NFTs.result.map((nft) => Number(nft.token_id));

    const NftData = NFTs.result.map((nft) => JSON.parse(nft.metadata));
    for (let i = 0; i < NftData.length; i++) {
      Object.assign(NftData[i], { token_id: NftsResults[i] });
    }
    if (NftData.length < 1) {
      return res
        .status(404)
        .json({ error: "theres not NFTs in that parameter" });
    }
    res.status(200).json(await NftData);
  } else {
    if (!req.query.name && !req.params.name) {
      return res.status(404).json({ error: "the input is empty" });
    } else if (req.params.name.length < 3) {
      return res.status(404).json({
        error: "the parameter must have a minimum length of 3 characters",
      });
    }
  }
};
//

const getNameNft = async (req, res) => {
  const { name } = req.query;
  if (req.query.name && req.query.name.length >= 3) {
    const options = { q: name, chain: "bsc", filter: "name" };
    const NFTs = await Moralis.Web3API.token.searchNFTs(options);
    const NftsResults = NFTs.result.map((nft) => Number(nft.token_id));

    const NftData = NFTs.result.map((nft) => JSON.parse(nft.metadata));
    for (let i = 0; i < NftData.length; i++) {
      Object.assign(NftData[i], { token_id: NftsResults[i] });
    }
    if (NftData.length < 1) {
      return res.status(404).json({ error: "theres not NFTs in that name" });
    }
    res.status(200).json(await NftData);
  } else {
    if (!req.query.name && !req.params.name) {
      return res.status(404).json({ error: "the input or parameter is empty" });
    } else if (req.query.name.length < 3) {
      return res.status(404).json({
        error: "the input must have a minimum length of 3 characters",
      });
    }
  }
};

const getIdNft = async (req, res) => {
  res.send(console.log("hola"));
};

module.exports = {
  getAllNft,
  getIdNft,
  getNameNft,
};
