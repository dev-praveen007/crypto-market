const express = require("express");
const { register, login } = require("../controllers/User/User.controller");
const { TokenAuthenticator } = require("../utils/authMiddleware");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/tokenAuthenticator", TokenAuthenticator);

module.exports = router;
