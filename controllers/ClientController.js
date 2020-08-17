const { ERROR_MESSAGE_STATUS_500 } = require("../constants");
const ClientModel = require("../models/Client");
const ColorsModels = require("../models/Color");

module.exports.allClients = async (req, res) => {
  try {
    const clients = await ClientModel.find();
    res.status(200).json(clients);
  } catch (e) {
    res.status(500).send({
      message: ERROR_MESSAGE_STATUS_500,
    });
  }
};

module.exports.add = async (req, res) => {
  try {
    const colors = await ColorsModels.find();
    const randomColorId = getRandomIntInclusive(1, 18);
    const client = new ClientModel({
      name: req.body.name,
      female: req.body.female,
      phone: req.body.phone,
      color: colors[randomColorId].hex,
    });
    const result = await client.save();
    res.status(200).json(result);
  } catch (e) {
    res.status(500).json({
      message: ERROR_MESSAGE_STATUS_500,
    });
  }
};

module.exports.delet = async (req, res) => {
  try {
    await ClientModel.deleteOne({
      _id: req.params.id,
    });
    res
      .status(200)
      .json({ id: req.params.id, message: "Клиент успешно удален" });
  } catch (e) {
    res.status(500).json({
      message: ERROR_MESSAGE_STATUS_500,
    });
  }
};

module.exports.update = async (req, res) => {
  try {
    const query = { _id: req.params.id };
    const update = req.body;
    const newWrite = await ClientModel.findOneAndUpdate(query, update);
    res.status(200).json({ newWrite });
  } catch (e) {
    res.send({ error: ERROR_MESSAGE_STATUS_500 });
  }
};

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
