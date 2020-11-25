const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserShema = new Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    refresh_token: { type: String },
    confirmed: { type: Boolean, default: false },
    confirmed_hash: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", UserShema);
