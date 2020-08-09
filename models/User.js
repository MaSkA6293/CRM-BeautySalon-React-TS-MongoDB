const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserShema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  clients: [{ type: mongoose.Types.ObjectId, ref: "Client" }],
});

module.exports = mongoose.model("user", UserShema);