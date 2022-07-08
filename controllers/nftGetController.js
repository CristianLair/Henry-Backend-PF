// const { all } = require("../routes/nftRoutes");
const Moralis = require('moralis/node');
const serverUrl = "https://hzgmh0bhktiz.usemoralis.com:2053/server"
const appId = "TvlbElMKEQ3ozadXOqUAthnvVYSIKgNIIrllWHBi"
const masterKey = 'bJ7z3DlllOjtYp1fRdf4ITSOXh6ewwvZEyR1nOQB'
Moralis.start({ serverUrl, appId , masterKey});


 const getAllNft = async (req, res) => {
//luego optimizar para que lleguen 10 de cosas diferentes
      const name = req.params.name
      if(req.params.name) {
        try {
            const options = { q: name , chain: "bsc", filter: "name" };
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
  }


const getNameNft = async (req, res) => {
    const {name} = req.query;
   
    try {
        const options = { q: name , chain: "bsc", filter: "name" };
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



const getIdNft = async (req, res) => {
     const {id} = req.params    
    try{
        if(id){
            const options = { q: id , chain: "bsc", filter: "id_token" };
            const NFTs = await Moralis.Web3API.token.searchNFTs(options);
            res.status(200).json(NFTs)
        }else{
            res.status(404).send("There is any NFT with that ID") 
        }
        }catch(e){
            console.log(e)
     }    
}


module.exports = {
    getAllNft,
    getIdNft,
    getNameNft
}