const mongoose = require("mongoose");

const { Schema } = mongoose;
const ListShema = new Schema({
  name: String,
  colorId: Number,
});

module.exports = mongoose.model("list", ListShema);
