
const axios = require('axios');


const getNFTCollection = async (req, res) => {
    try {
        const request = await axios.get('https://hzgmh0bhktiz.usemoralis.com/collection.json');

        
        res.send(request.data.results);
        



    } catch (error) {
        res.send(error)
    }
}

module.exports = {
    getNFTCollection
  };