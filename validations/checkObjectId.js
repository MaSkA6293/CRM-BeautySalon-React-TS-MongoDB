const objectId = require("mongoose").ObjectID;

const checkId = (id) => {
  return objectId.isValid(id);
};

module.exports = checkId;
