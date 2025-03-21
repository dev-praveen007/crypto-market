const express = require('express');
const router = express.Router();
const authRouter = require("./auth.route");
const marketRouter = require("./market.route");
const holdingRouter = require("./holding.route");

router.use("/auth",authRouter);
router.use("/market",marketRouter);
router.use("/holdings",holdingRouter);

module.exports = router;
