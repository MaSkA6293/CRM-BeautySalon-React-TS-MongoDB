const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ClientShema = new Schema({
  id: Number,
  name: String,
  female: String,
  phone: String,
  color: String,
});

module.exports = mongoose.model("client", ClientShema);
