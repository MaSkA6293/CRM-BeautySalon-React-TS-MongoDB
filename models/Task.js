const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskShema = new Schema({
  listId: String,
  text: String,
  completed: Boolean,
});

module.exports = mongoose.model("task", TaskShema);
