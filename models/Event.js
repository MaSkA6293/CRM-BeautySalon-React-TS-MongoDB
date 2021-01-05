const mongoose = require("mongoose");

const { Schema } = mongoose;

const EventShema = new Schema({
  title: String,
  day: String,
  start: String,
  end: String,
  allDay: Boolean,
  color: String,
  clientId: String,
  userId: {
    required: true,
    ref: "User",
    type: Schema.Types.ObjectId,
  },
});

module.exports = mongoose.model("event", EventShema);
