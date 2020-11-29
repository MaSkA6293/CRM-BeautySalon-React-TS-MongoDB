const { validationResult } = require("express-validator");
const { ERROR_MESSAGE_STATUS_500 } = require("../constants");
const ClientModel = require("../models/Client");
const ColorsModels = require("../models/Color");
const checkId = require("../validations/checkObjectId");
const getRandomInt = require("../utils/getRandom");

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
  } catch {
    res.status(500).send({
      message: ERROR_MESSAGE_STATUS_500,
    });
  }
};

module.exports.add = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(401).json({
        errors: errors.array(),
        message: "Не корректные данные при регистрации",
      });
    }
    const colors = await ColorsModels.find();
    const randomColorId = getRandomInt(1, 18);
    const client = new ClientModel({
      name: req.body.name,
      surname: req.body.surname,
      phone: req.body.phone,
      color: colors[randomColorId].hex,
      userId: req.user._id,
    });
    const result = await client.save();
    return res
      .status(200)
      .json({ client: result, message: "Клиент успешно добавлен" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: ERROR_MESSAGE_STATUS_500,
    });
  }
};

module.exports.delet = async (req, res) => {
  try {
    const clientId = req.params.id;
    if (!checkId(clientId)) {
      return res.status(400).json({ message: "Не корректный ID" });
    }
    const client = await ClientModel.findById(clientId);
    if (client) {
      client.remove();
      return res
        .status(200)
        .json({ _id: req.params.id, message: "Клиент успешно удален" });
    }
    return res.status(400).json({ message: "Ошибка удаления клиента" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
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
    res
      .status(200)
      .json({ userData, message: "Данные клиента успешно изменены" });
  } catch {
    res.send({ error: ERROR_MESSAGE_STATUS_500 });
  }
};
