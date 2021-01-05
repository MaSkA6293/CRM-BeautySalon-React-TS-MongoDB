const mongoose = require("mongoose");

const { Schema } = mongoose;

const ClientShema = new Schema({
  name: String,
  surname: String,
  phone: String,
  color: String,
  userId: {
    required: true,
    ref: "User",
    type: Schema.Types.ObjectId,
  },
});

module.exports = mongoose.model("client", ClientShema);
