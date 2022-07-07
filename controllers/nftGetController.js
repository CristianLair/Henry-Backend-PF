
 const getAllNft = async (req, res) => {
    const {type} = req.params
    const serverUrl = "https://hzgmh0bhktiz.usemoralis.com:2053/server"
    const appId = "TvlbElMKEQ3ozadXOqUAthnvVYSIKgNIIrllWHBi"
    Moralis.start({ serverUrl, appId });
    try {
        const options = { q: type , chain: "bsc", filter: "name" };
        const NFTs = await Moralis.Web3API.token.searchNFTs(options);
        res.send(NFTs)
        
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