const mongoose = require("mongoose");

const { Schema } = mongoose;

const ServiceCategoryShema = new Schema({
  name: String,
  colorId: String,
  userId: String,
});

module.exports = mongoose.model("serviceCategory", ServiceCategoryShema);
