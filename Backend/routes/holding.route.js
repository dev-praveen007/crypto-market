const express = require("express");
const { register, login } = require("../controllers/User/User.controller");
const {
  getUserHoldings,
  buyCrypto,
  sellCrypto,
} = require("../controllers/CryptoHoldings/Holdings.controller");
const { verifyToken } = require("../utils/authMiddleware");

const router = express.Router();

router.get("/", verifyToken, getUserHoldings);
router.post("/buy", verifyToken, buyCrypto);
router.post("/sell", verifyToken, sellCrypto);

module.exports = router;
