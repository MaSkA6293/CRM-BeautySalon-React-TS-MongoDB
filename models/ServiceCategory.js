const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ServiceCategoryShema = new Schema({
  name: String,
  colorId: String,
  userId: String,
});

module.exports = mongoose.model("serviceCategory", ServiceCategoryShema);
