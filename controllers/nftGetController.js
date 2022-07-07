

 const getAllNft = async (req, res) => {
res.status(200).send()
 res.send(console.log("hola"))
}

 const getIdNft = async (req, res) => {
    res.send(console.log("hola"))
}

module.exports = {
    getAllNft,
    getIdNft
}

// const options = { q: "Pancake", chain: "bsc", filter: "name" };
// const NFTs = await Moralis.Web3API.token.searchNFTs(options);


// async function query() {
//     try {
//         const options = { q: "Pancake", chain: "bsc", filter: "name" };
//         const NFTs2 = await Moralis.Web3API.token.searchNFTs(options);
//         console.log('acaaaaaaa2', NFTs2);
//     } catch (error) {
//         console.log(error) 
//     }
// }

//npm i moralis 

// moralis.start({serverUrl, appId});