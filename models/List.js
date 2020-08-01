const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ListShema = new Schema({
  name: String,
  colorId: Number,
});

module.exports = mongoose.model("list", ListShema);
