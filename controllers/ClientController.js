const { ERROR_MESSAGE_STATUS_500 } = require("../constants");
const ClientModel = require("../models/Client");
const ColorsModels = require("../models/Color");

module.exports.allClients = async (req, res) => {
  try {
    const clients = await ClientModel.find({ userId: req.user._id });
    const userData = clients.map((item) => {
      return {
        _id: item._id,
        name: item.name,
        surname: item.surname,
        phone: item.phone,
        color: item.color,
      };
    });
    res.status(200).json(userData);
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
      surname: req.body.surname,
      phone: req.body.phone,
      color: colors[randomColorId].hex,
      userId: req.user._id,
    });
    const result = await client.save();
    res.status(200).json({ client: result, message: "Клиент успешно добавлен" });
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
    const newWrite = await ClientModel.findOneAndUpdate(query, update, {
      new: true,
    });

    const userData = {
      _id: newWrite._id,
      name: newWrite.name,
      surname: newWrite.surname,
      phone: newWrite.phone,
      color: newWrite.color,
    };
    res.status(200).json(userData);
  } catch (e) {
    res.send({ error: ERROR_MESSAGE_STATUS_500 });
  }
};

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
