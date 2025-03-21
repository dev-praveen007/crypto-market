const Holdings = require("../../models/Holdings.model");

const findHolding = async (findData, projection) => {
  try {
    return await Holdings.findOne(findData, projection);
  } catch (e) {
    console.log("errror on findHolding", e);
  }
};

const findHoldings = async (findData, projection) => {
  try {
    return await Holdings.find(findData, projection);
  } catch (e) {
    console.log("errror on findHolding", e);
  }
};

const saveHoldings = async (data) => {
  try {
    const hold = new Holdings(data);
    await hold.save();
    return hold;
  } catch (e) {
    console.log("errro n saveHoldings", e);
  }
};

const getHoldingsByUserId = async (id) => {
  try {
    const getData = await Holdings.aggregate([
      { $match: { userId: id } },
      {
        $group: {
          _id: "$crypto",
          totalAmount: { $sum: "$qty" },
          symbol: { "$first": "$symbol" }
        },
      },
      { $sort: { _id: 1 } },
    ]);
    return getData
  } catch (e) {
    console.log("erro on getHoldingsByUserId", e);
    return []
  }
};

module.exports = {
  findHolding,
  findHoldings,
  saveHoldings,
  getHoldingsByUserId
};
