const Moralis = require("moralis/node");
const { stringify } = require("uuid");
const serverUrl = "https://hzgmh0bhktiz.usemoralis.com:2053/server";
const appId = "TvlbElMKEQ3ozadXOqUAthnvVYSIKgNIIrllWHBi";
const masterKey = "bJ7z3DlllOjtYp1fRdf4ITSOXh6ewwvZEyR1nOQB";
Moralis.start({ serverUrl, appId, masterKey });


const getNftsComplete = async (req, res ) => {
    try {

        let cursor = null;
        const respuesta = [];
        let cont = 0;

        do {
            const options = { q: 'cat', chain: "bsc", filter: "global", cursor : cursor };
            const NFTs = await Moralis.Web3API.token.searchNFTs(options);
            console.log(
                `Got page ${NFTs.page} of ${Math.ceil(
                  NFTs.total / NFTs.page_size
                )}, ${NFTs.total} total`
              );
              for (let nft of NFTs.result) {
                const metadata = JSON.parse(nft.metadata);
                respuesta.push({
                    id : nft.token_id,
                    token_address : nft.token_address,
                    name : metadata.name,
                    description : metadata.description,
                    image : metadata.image

                })
              }
              cursor = NFTs.cursor;
              
              cont ++;
              console.log(cont)

        }while(cont !== 3)

        console.log(respuesta.length)
        res.send(respuesta)
        
    } catch (error) {
        console.log(error)
        
    }
    

}


module.exports = {
    getNftsComplete
  };
  