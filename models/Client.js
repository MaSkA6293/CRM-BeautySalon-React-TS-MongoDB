const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ClientShema = new Schema({
  id: Number,
  name: String,
  surname: String,
  phone: String,
  color: String,
  userId: {
    required: true,
    ref: "User",
    type: Schema.Types.ObjectId
  },
});

module.exports = mongoose.model("client", ClientShema);
