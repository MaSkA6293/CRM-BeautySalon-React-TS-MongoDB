const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ServiceShema = new Schema({
  name: String,
  hours: String,
  minutes: String,
  price: String,
  color: String,
  userId: String,
});

module.exports = mongoose.model("service", ServiceShema);
