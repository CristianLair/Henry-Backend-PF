// const { all } = require("../routes/nftRoutes");
const Moralis = require('moralis/node');
const serverUrl = "https://hzgmh0bhktiz.usemoralis.com:2053/server"
const appId = "TvlbElMKEQ3ozadXOqUAthnvVYSIKgNIIrllWHBi"
const masterKey = 'bJ7z3DlllOjtYp1fRdf4ITSOXh6ewwvZEyR1nOQB'
Moralis.start({ serverUrl, appId , masterKey});


 const getAllNft = async (req, res) => {
//luego optimizar para que lleguen 10 de cosas diferentes
      try {
          const options = { q: "cat" , chain: "bsc", filter: "name" };
          const NFTs = await Moralis.Web3API.token.searchNFTs(options);
          const NftsResults = NFTs.result.map((nft)=> Number(nft.token_id));
          
          const NftData = NFTs.result.map((nft) => JSON.parse(nft.metadata));
          for (let i = 0; i < NftData.length; i++) {
            Object.assign(NftData[i], {token_id: NftsResults[i]});
          }
          res.status(200).json(await NftData)
          
      } catch (error) {
          console.log(error)
      }
  }
//

const getNameNft = async (req, res) => {
    const {name} = req.query;
    try {
        const options = { q: name , chain: "bsc", filter: "name" };
        const NFTs = await Moralis.Web3API.token.searchNFTs(options);
        const NftData = NFTs.result.map((nft) => JSON.parse(nft.metadata));
        res.status(200).json(await NftData)
    } catch (error) {
        console.log(error)
    }
}


 const getIdNft = async (req, res) => {
    res.send(console.log("hola"))
}

module.exports = {
    getAllNft,
    getIdNft
}