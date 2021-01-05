const { validationResult } = require("express-validator");
const { ERROR_MESSAGE_STATUS_500 } = require("../constants");
const EventModel = require("../models/Event");
const ClientModel = require("../models/Client");
const checkId = require("../validations/checkObjectId");

module.exports.allEvents = async (req, res) => {
  try {
    const events = await EventModel.find({ userId: req.user._id });
    res.status(200).json(events);
  } catch {
    res.status(400).send();
  }
};

module.exports.add = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    let id = "";
    if (await checkId(req.body.clientId)) {
      const checkClient = await ClientModel.find({ _id: req.body.clientId });
      id = checkClient !== undefined ? req.body.clientId : "new";
    } else id = "new";
    const event = EventModel({
      title: req.body.title,
      day: req.body.day,
      start: req.body.start,
      end: req.body.end,
      allDay: req.body.allDay,
      color: req.body.color,
      clientId: id,
      userId: req.user._id,
    });
    const result = await event.save();
    return res
      .status(201)
      .json({ event: result, message: "Событие успешно добавлено" });
  } catch {
    return res.status(500).json({
      message: ERROR_MESSAGE_STATUS_500,
    });
  }
};

module.exports.delet = async (req, res) => {
  try {
    const eventId = req.params.id;
    if (!checkId(eventId)) {
      return res.status(400).json({ message: "Не корректный ID" });
    }
    const event = await EventModel.findById(eventId);
    if (event) {
      event.remove();
      return res
        .status(200)
        .json({ _id: req.params.id, message: "Событие успешно удалено" });
    }
    return res
      .status(400)
      .json({ message: "Ошибка. Не удалось удалить событие" });
  } catch {
    return res.status(500).json({
      message: ERROR_MESSAGE_STATUS_500,
    });
  }
};

module.exports.update = async (req, res) => {
  try {
    const query = { _id: req.params.id };
    const update = req.body;
    const event = await EventModel.findOneAndUpdate(query, update, {
      new: true,
    });
    res.status(200).json({ event, message: "Изменения успешно применены" });
  } catch {
    res.send({ error: ERROR_MESSAGE_STATUS_500 });
  }
};
