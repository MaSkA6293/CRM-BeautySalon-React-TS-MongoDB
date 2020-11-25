const crypto = require("crypto");

const generateMD5 = (value) =>
  crypto.createHash("md5").update(value).digest("hex");

module.exports = generateMD5;
