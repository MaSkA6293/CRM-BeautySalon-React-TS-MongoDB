const mongoose = require("mongoose");

const { Schema } = mongoose;

const ServiceShema = new Schema({
  name: String,
  duration: Array,
  cost: Number,
  colorId: String,
  categoriesId: Array,
  userId: String,
});

module.exports = mongoose.model("service", ServiceShema);
