const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ColorShema = new Schema({ id: Number, hex: String, name: String });

module.exports = mongoose.model("color", ColorShema);
