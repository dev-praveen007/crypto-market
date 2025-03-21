
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId;
const responseSender = (statusCode, status, message, data = null, res) => {
  try {
    res.status(statusCode).json({ status, message, data });
  } catch (e) {
    console.log("Error on responseSender", e);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const HashPassword = await bcrypt.hash(password, salt);
    return HashPassword;
  } catch (e) {
    console.log("Error on hashPassword", e);
    return undefined;
  }
};

const comparePassword = async (password, hashPass) => {
  try {
    return await bcrypt.compare(password, hashPass);
  } catch (e) {
    console.log("Error on comparePassword", e);
    return false;
  }
};

const toObjectId = (id) => new objectId(id);

const isEmpty = (value) =>
  value === undefined ||
  value == "undefined" ||
  value === null ||
  value == false ||
  value == "false" ||
  (typeof value === "object" && Object.keys(value).length === 0) ||
  (typeof value === "object" && Array.isArray(value) && value.length === 0) ||
  (typeof value === "string" && value.trim().length === 0) ||
  (typeof value === "string" && value === "0") ||
  (typeof value === "number" && value === 0);

module.exports = {
  responseSender,
  hashPassword,
  comparePassword,
  toObjectId,
  isEmpty
};
