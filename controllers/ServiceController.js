const { validationResult } = require("express-validator");
const { ERROR_MESSAGE_STATUS_500 } = require("../constants");
const ServiceModels = require("../models/Service");

module.exports.add = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(401).json({
        errors: errors.array(),
        message: "Не корректные данные при создании услуги",
      });
    }
    const service = new ServiceModels({
      name: req.body.name,
      duration: req.body.duration,
      cost: req.body.cost,
      colorId: req.body.colorId,
      categoriesId: req.body.categoriesId,
      userId: req.user._id,
    });
    const result = await service.save();
    const answer = {
      data: {
        _id: result._id,
        name: result.name,
        duration: result.duration,
        cost: result.cost,
        colorId: result.colorId,
        categoriesId: result.categoriesId,
      },
      message: "Услуга успешно добавлена",
    };
    return res.status(200).json(answer);
  } catch {
    return res.status(500).json({
      message: ERROR_MESSAGE_STATUS_500,
    });
  }
};

module.exports.getAllServices = async (req, res) => {
  try {
    const services = await ServiceModels.find({ userId: req.user._id });
    const servicesData = services.map((item) => {
      return {
        _id: item._id,
        name: item.name,
        duration: item.duration,
        cost: item.cost,
        colorId: item.colorId,
        categoriesId: item.categoriesId,
      };
    });
    res.status(200).json(servicesData);
  } catch {
    res.status(500).send({
      message: ERROR_MESSAGE_STATUS_500,
    });
  }
};

module.exports.update = async (req, res) => {
  try {
    const query = { _id: req.body._id };
    const update = req.body;
    const newWrite = await ServiceModels.findOneAndUpdate(query, update, {
      new: true,
    });

    const userData = {
      data: {
        _id: newWrite._id,
        name: newWrite.name,
        duration: newWrite.duration,
        cost: newWrite.cost,
        categoriesId: newWrite.categoriesId,
        colorId: newWrite.colorId,
      },
      message: "Услуга успешно обновлена",
    };
    res.status(200).json(userData);
  } catch {
    res.status(500).send({
      message: ERROR_MESSAGE_STATUS_500,
    });
  }
};

module.exports.delet = async (req, res) => {
  try {
    await ServiceModels.deleteOne({
      _id: req.body._id,
    });
    res
      .status(200)
      .json({ _id: req.body._id, message: "Услуга успешно удалена" });
  } catch {
    res.status(500).send({
      message: ERROR_MESSAGE_STATUS_500,
    });
  }
};
