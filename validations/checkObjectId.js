const objectId = require("mongoose").Types.ObjectId;

const checkId = (id) => {
  return objectId.isValid(id);
};

module.exports = checkId;
