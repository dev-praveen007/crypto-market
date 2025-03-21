const { default: axios } = require("axios");

const getCoinDataWithId = async (id) => {
    const options = {
        method: "GET",
        url: `https://api.coingecko.com/api/v3/coins/${id}`,
        headers: { accept: "application/json" },
    };
    const getData = await axios(options);
    return getData?.data
}


const getCurrentCoinDatas = async (page) => {
    const options = {
        method: "GET",
        url: `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=20&page=${page}`,
        headers: { accept: "application/json" },
    };
    const getData = await axios(options);
    return getData?.data
}

module.exports = {
    getCoinDataWithId,
    getCurrentCoinDatas
}