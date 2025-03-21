const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
const { userFind } = require("../controllers/User/User.service");
const { responseSender, isEmpty } = require("./common");

dotenv.config();

const verifyToken = async (req, res, next) => {

  const token = req.header("Authorization")?.split(" ")[1];
  if (!token)
    return responseSender(
      401,
      "error",
      "Access denied, Token not provided",
      null,
      res
    );

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const getUser = await userFind({ _id: decoded?.userId });
    console.log("getUser", getUser);

    if (!getUser)
      return responseSender(401, "error", "Invalid user", null, res);

    req.user = getUser;
    next();
  } catch (error) {
    return responseSender(401, "error", "Invalid token", null, res);
  }
};

const jwtSign = (data) => {
  try {
    return jwt.sign(data, process.env.JWT_SECRET, {
      expiresIn: process.env.EXPIRES_IN,
    });
  } catch (e) {
    console.log("Error on jwtSign", e);
    return "";
  }
};

const TokenAuthenticator = async (req, res) => {
  try {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token)
      return responseSender(
        401,
        "error",
        "Access denied, Token not provided",
        null,
        res
      );
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const getUser = await userFind({ _id: decoded?.userId }, { password: 0 });

    if (!isEmpty(getUser)) return responseSender(200, "success", "Valid token", getUser, res);
    else return responseSender(401, "error", "Invalid token", null, res);

  } catch (e) {
    console.log("Error on TokenAuthenticator", e, e?.message);
    return responseSender(401, "error", e?.message || "Invalid token", null, res);
  }
}


module.exports = {
  verifyToken,
  jwtSign,
  TokenAuthenticator
};
