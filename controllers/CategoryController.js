const { validationResult } = require("express-validator");
const { ERROR_MESSAGE_STATUS_500 } = require("../constants");
const CategoryModels = require("../models/ServiceCategory");

module.exports.add = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(401).json({
        errors: errors.array(),
        message: "Не корректные данные при создании категории",
      });
    }

    const category = new CategoryModels({
      name: req.body.name,
      colorId: req.body.colorId,
      userId: req.user._id,
    });
    const result = await category.save();
    const answer = {
      data: {
        _id: result._id,
        name: result.name,
        colorId: result.colorId,
      },
      message: "Категория успешно добавлена",
    };
    return res.status(200).json(answer);
  } catch {
    return res.status(500).json({
      message: ERROR_MESSAGE_STATUS_500,
    });
  }
};

module.exports.getAllCategories = async (req, res) => {
  try {
    const categories = await CategoryModels.find({ userId: req.user._id });
    const categoriesData = categories.map((item) => {
      return {
        _id: item._id,
        name: item.name,
        colorId: item.colorId,
      };
    });
    res.status(200).json(categoriesData);
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
    const newWrite = await CategoryModels.findOneAndUpdate(query, update, {
      new: true,
    });
    const userData = {
      data: {
        _id: newWrite._id,
        name: newWrite.name,
        colorId: newWrite.colorId,
      },
      message: "Категория успешно обновлена",
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
    await CategoryModels.deleteOne({
      _id: req.body._id,
    });
    res
      .status(200)
      .json({ _id: req.body._id, message: "Категория успешно удалена" });
  } catch {
    res.status(500).send({
      message: ERROR_MESSAGE_STATUS_500,
    });
  }
};
