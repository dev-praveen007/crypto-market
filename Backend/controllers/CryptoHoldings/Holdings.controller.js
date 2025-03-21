const { responseSender, toObjectId } = require("../../utils/common");
const { getCoinDataWithId } = require("../Market/Market.service");
const { saveHoldings, getHoldingsByUserId } = require("./Holdings.service");

const buyCrypto = async (req, res) => {
  try {
    const { crypto, qty, price, symbol } = req.body;

    const saveData = await saveHoldings({
      crypto,
      qty,
      price,
      type: "BUY",
      userId: req.user?._id,
      symbol
    });

    responseSender(200, "success", "Crypto bought successfully", saveData, res);
  } catch (e) {
    console.log("buycytooo", e);
    responseSender(400, "error", "Error on buyCrypto", null, res, res);
  }
};

const sellCrypto = async (req, res) => {
  try {
    const { crypto, qty, price, symbol } = req.body;

    const saveData = await saveHoldings({
      crypto,
      qty: -qty,
      price,
      type: "SELL",
      userId: toObjectId(req.user?._id),
      symbol
    });

    responseSender(200, "success", "Crypto selled successfully", saveData, res);
  } catch (e) {
    console.log("error on sellCrypto", e);
    responseSender(400, "error", "Error on buyCrypto", null, res);
  }
};

const getUserHoldings = async (req, res) => {
  try {
    const getData = await getHoldingsByUserId(req.user?._id);

    responseSender(
      200,
      "success",
      "Holdings fetched successfully",
      getData,
      res
    );
  } catch (e) {
    console.log("Error on getUserHoldings", e);
    responseSender(400, "error", "Error on getUserHoldings", null, res);
  }
};

module.exports = {
  buyCrypto,
  sellCrypto,
  getUserHoldings,
};
