const Moralis = require("moralis/node");
const { stringify } = require("uuid");
const nftSchema = require('../models/Nft.js')
const mongoose = require('mongoose')
const serverUrl = "https://hzgmh0bhktiz.usemoralis.com:2053/server";
const appId = "TvlbElMKEQ3ozadXOqUAthnvVYSIKgNIIrllWHBi";
const masterKey = "bJ7z3DlllOjtYp1fRdf4ITSOXh6ewwvZEyR1nOQB";
Moralis.start({ serverUrl, appId, masterKey });


const getNftsComplete = async (req, res ) => {
    try {

        const cursor = req.query.cursor ? req.query.cursor : null;
        
       
        const respuesta = [];
        
        
            const options = { q: 'cat', chain: "eth", filter: "global", cursor : cursor };
            const NFTs = await Moralis.Web3API.token.searchNFTs(options);
            respuesta.push({
                page : NFTs.page,
                totalPage : Math.ceil(NFTs.total / NFTs.page_size),
                cursor : NFTs.cursor,
                totalItems : NFTs.total
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
                    _id: nft.token_id,
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
        

        if (token_address === '1'){
            //buscar en db
            const nftBd = await nftSchema.findById(id)
            res.send(nftBd)
        }else {
            //buscar en api moralis
            
            const options = {
                address: token_address,
                token_id: id,
                chain: "eth",
            };
            const option2 = {
                address : token_address,
                chain : 'eth'
            }
          const nft = await Moralis.Web3API.token.getTokenIdMetadata(options);
          const priceNft = await Moralis.Web3API.token.getTokenPrice(options2)
          const metadata = JSON.parse(nft.metadata);
          const respuesta = {
            token_address : nft.token_address,
            _id : nft.token_id,
            owner_of : nft.owner_of,
            collection : nft.name,
            symbol : nft.symbol,
            name : metadata.name,
            description : metadata.description,
            image : metadata.image

          }
            res.send(priceNft)
        }

    
        
    } catch (error) {
        res.send(error)
    }
}

const getOneCollection = async (req, res) => {
    try {
        const {address} = req.query;
        const cursor = req.query.cursor ? req.query.cursor : null;

        const respuesta = [];
        const options = {
            address: address,
            chain: "eth",
            cursor : cursor
          };
          const NFTs = await Moralis.Web3API.token.getAllTokenIds(options);
          respuesta.push({
            page : NFTs.page,
            totalPage : Math.ceil(NFTs.total / NFTs.page_size),
            cursor : NFTs.cursor,
            totalItems : NFTs.total
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
                _id: nft.token_id,
                token_address : nft.token_address,
                collection : nft.name,
                name : metadata.name,
                description : metadata.description,
                image : metadata.image,
                
                

            })
          }

          res.send(respuesta)
        
    } catch (error) {
        res.send(error)
        
    }
    
}

const getNFTPrice = async (req, res) => {
    try {
        //Get token price on PancakeSwap v2 BSC
    const options = {
        address: "0xd31fC221D2b0E0321C43E9F6824b26ebfFf01D7D",
        chain: 'eth'
        
        
    };
    const price = await Moralis.Web3API.token.getTokenPrice(options);
    res.send(price)
    } catch (error) {
        res.send(error)
    }
}

module.exports = {
    getNftsComplete,
    getNftId,
    getOneCollection,
    getNFTPrice
    
  };
  