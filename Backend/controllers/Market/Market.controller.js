const { responseSender } = require("../../utils/common");
const { getRedis, setRedis } = require("../../utils/redisConnector");
const { getCoinDataWithId, getCurrentCoinDatas } = require("./Market.service");

const getMarketPrices = async (req, res) => {
  try {

    const { page = 1 } = req.query;

    const cachedData = await getRedis(`crypto-prices:${page}`);
    if (cachedData) {
      return responseSender(200, "success", "Fetched successfully", JSON.parse(cachedData), res);
    }

    const getData = await getCurrentCoinDatas(page);

    await setRedis(`crypto-prices:${page}`, getData);

    responseSender(200, "success", "Fetched successfully", getData, res)
  } catch (e) {
    console.log("error on getMarketPrices", e);
    responseSender(400, "error", "Error", null, res)
  }
};

const getCoinPortfolio = async (req, res) => {
  try {

    const { id = "" } = req.query;

    const cachedData = await getRedis(`crypto-coin:${id}`);
    if (cachedData) {
      return responseSender(200, "success", "Fetched successfully", JSON.parse(cachedData), res);
    }

    const getData = await getCoinDataWithId(id);

    await setRedis(`crypto-coin:${id}`, getData);

    responseSender(200, "success", "Fetched successfully", getData, res)
  } catch (e) {
    console.log("error on getMarketPrices", e);
    responseSender(400, "error", "Error", null, res)
  }
};

module.exports = {
  getMarketPrices,
  getCoinPortfolio
};
