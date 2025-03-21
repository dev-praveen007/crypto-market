const express = require("express");
const { verifyToken } = require("../utils/authMiddleware");
const { getMarketPrices, getCoinPortfolio } = require("../controllers/Market/Market.controller");
const router = express.Router();

router.get("/prices",verifyToken,getMarketPrices);
router.get("/coin-portfolio",verifyToken,getCoinPortfolio);

module.exports = router;
