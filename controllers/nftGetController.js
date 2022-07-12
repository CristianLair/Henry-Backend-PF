// const { all } = require("../routes/nftRoutes");
const Moralis = require("moralis/node");
const { stringify } = require("uuid");
const serverUrl = "https://hzgmh0bhktiz.usemoralis.com:2053/server";
const appId = "TvlbElMKEQ3ozadXOqUAthnvVYSIKgNIIrllWHBi";
const masterKey = "bJ7z3DlllOjtYp1fRdf4ITSOXh6ewwvZEyR1nOQB";
const nftSchema = require('../models/Nft.js');

Moralis.start({ serverUrl, appId, masterKey });

//filtrar los nfts que no tengan imagen quye no paarecescan ni gif
// que no se repita la imagen, como hacer que no se repita los elementros de un array

//params vacio traiga bichos aleatorios, si tarda mucho meten un loading
//

const getAllNft = async (req, res) => {
  const name = req.params.name;
  if (req.params.name && req.params.name.length >= 3) {
    var FinalArrayNft = [];
    const options = { q: name, chain: "bsc", filter: "description" };
    const NFTs = await Moralis.Web3API.token.searchNFTs(options);
    
    // function arrayAcumulatorNft() {
      const NftsIds = NFTs.result.map((nft) => Number(nft.token_id));
      const NftData = NFTs.result.map((nft) => JSON.parse(nft.metadata));
      for (let i = 0; i < NftData.length; i++) {
        Object.assign(NftData[i], { token_id: NftsIds[i] });
      }
    
      // FinalArrayNft = [...FinalArrayNft, ...NftData];
  
      
      // if(FinalArrayNft.length < 300) {
      //   NFTs.next();
      //   arrayAcumulatorNft();
      // } else {
        const requireData = NftData.filter((nft) => {
          let link = nft.image ? nft.image.slice(0, 4) : "ipfs";
          let link2 = nft.image ? nft.image.slice(0, 4) : "data";
          if (nft.description === "" ||
          link === "ipfs" ||
          link2 === "data" ||
          typeof nft.name === "number" ||
          typeof nft.description === "number") {
            return false;
          }
          return true;
        }).map((nft) => {
          return {
            token_id: nft.token_id,
            image: nft.image,
            description: nft.description,
            name: nft.name,
          };
        });
    
        
        const getDbNfts = async => {
          const allnfts = nftSchema.find({}).sort({createdAt: -1})
          return allnfts;
        }

        var dbnfts = await getDbNfts()
         const DBFILTERED = dbnfts.map((nft) => {
          return {
            token_id: nft._id,
            image: nft.image,
            description: nft.description,
            name: nft.name,
          };
        });
        const finalContent = [...requireData, ...DBFILTERED]
        console.log(finalContent)
        res.status(200).json(finalContent);

        if (finalContent.length < 1) {
          return res
            .status(404)
            .json({ error: "there's not NFTs in that parameter" });
        }

      // }
    // }
    // arrayAcumulatorNft()

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
    const options = { q: name, chain: "bsc", filter: "name" };
    const NFTs = await Moralis.Web3API.token.searchNFTs(options);
    const NftsResults = NFTs.result.map((nft) => Number(nft.token_id));

    const NftData = NFTs.result.map((nft) => JSON.parse(nft.metadata));
    for (let i = 0; i < NftData.length; i++) {
      Object.assign(NftData[i], { token_id: NftsResults[i] });
    }
    const requireData = NftData.filter((nft) => {
      let link = nft.image ? nft.image.slice(0, 4) : "ipfs";
      if (nft.description === "" || link === "ipfs") {
        return false;
      }
      return true;
    }).map((nft) => {
      return {
        token_id: nft.token_id,
        image: nft.image,
        description: nft.description,
        name: nft.name,
      };
    });
    if (requireData.length < 1) {
      return res.status(404).json({ error: "There's not NFTs in that name" });
    }
    res.status(200).json(requireData);
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
  const { id } = req.params;
  try {
    if (id) {
      const options = { q: id, chain: "bsc", filter: "name" };
      const NFTs = await Moralis.Web3API.token.searchNFTs(options);
      const NftsResults = NFTs.result.map((nft) => Number(nft.token_id));

      const NftData = NFTs.result.map((nft) => JSON.parse(nft.metadata));
      for (let i = 0; i < NftData.length; i++) {
        Object.assign(NftData[i], { token_id: NftsResults[i] });
      }
      const requireData = NftData.filter((nft) => {
        let link = nft.image ? nft.image.slice(0, 4) : "ipfs";
        let link2 = nft.image ? nft.image.slice(0, 4) : "data";
        if (
          nft.description === "" ||
          link === "ipfs" ||
          link2 === "data" ||
          typeof nft.name === "number" ||
          typeof nft.description === "number" ||
          nft.token_id !== Number(req.params.id)
        ) {
          return false;
        }
        return true;
      }).map((nft) => {
        return {
          token_id: nft.token_id,
          image: nft.image,
          description: nft.description,
          name: nft.name,
        };
      });

      res.status(200).json(requireData);
    } else {
      return res.status(404).send("There is any NFT with that ID");
    }
  } catch (e) {
    console.log(e);
  }
};

const findNftIdDb = async () => {
    const idsNft = await nftSchema.findById(id)
    return idsNft
}


module.exports = {
  getAllNft,
  getIdNft,
  getNameNft,
  findNftIdDb
};

