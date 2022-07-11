const Moralis = require("moralis/node");
const { stringify } = require("uuid");
const Nft = require('../models/Nft')
const serverUrl = "https://hzgmh0bhktiz.usemoralis.com:2053/server";
const appId = "TvlbElMKEQ3ozadXOqUAthnvVYSIKgNIIrllWHBi";
const masterKey = "bJ7z3DlllOjtYp1fRdf4ITSOXh6ewwvZEyR1nOQB";
Moralis.start({ serverUrl, appId, masterKey });


const getNftsComplete = async (req, res ) => {
    try {

        const cursor = req.query.cursor ? req.query.cursor : null;
        
       
        const respuesta = [];
        
        
            const options = { q: 'cat', chain: "bsc", filter: "global", cursor : cursor };
            const NFTs = await Moralis.Web3API.token.searchNFTs(options);
            respuesta.push({
                page : NFTs.page,
                totalPage : Math.ceil(NFTs.total / NFTs.page_size),
                cursor : NFTs.cursor
            })
            console.log(
                `Got page ${NFTs.page} of ${Math.ceil(
                  NFTs.total / NFTs.page_size
                )}, ${NFTs.total} total`
              );
             
              
              for (let nft of NFTs.result) {
                const metadata = JSON.parse(nft.metadata);
                const link =  metadata.image ? metadata.image.slice(0, 4) : null;
                if(link === 'ipfs' || link === 'data' || link === null ) continue;
                respuesta.push({
                    id : nft.token_id,
                    token_address : nft.token_address,
                    name : metadata.name,
                    description : metadata.description,
                    image : metadata.image,
                    
                    

                })
              }
              
              
              
              

        

        console.log(respuesta.length)
        res.send(respuesta)
        
    } catch (error) {
        console.log(error)
        
    }
    

}


const getNftId = async (req, res) => {
    try {
        const {id, token_address} = req.query;

         

        const respuesta = [];

        const options = {
            address: token_address,
            token_id: id,
            chain: "bsc",
          };
          const tokenIdMetadata = await Moralis.Web3API.token.getTokenIdMetadata(options);

          

          const metadata = JSON.parse(tokenIdMetadata.metadata);
                
                respuesta.push({
                    
                    name : metadata.name,
                    description : metadata.description,
                    image : metadata.image,
                    
                    

                })

          res.send(respuesta);
        
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getNftsComplete,
    getNftId
  };
  