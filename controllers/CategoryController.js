const { ERROR_MESSAGE_STATUS_500 } = require("../constants");
const CategoryModels = require("../models/ServiceCategory");

const { validationResult } = require("express-validator");

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
    res.status(200).json(answer);
  } catch (e) {
    res.status(500).json({
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
  } catch (e) {
    res.status(500).send({
      message: ERROR_MESSAGE_STATUS_500,
    });
  }
};

// module.exports.update = async (req, res) => {
//   try {
//     const query = { _id: req.body._id };
//     const update = req.body;
//     const newWrite = await ServiceModels.findOneAndUpdate(query, update, {
//       new: true,
//     });

//     const userData = {
//       data: {
//         _id: newWrite._id,
//         name: newWrite.name,
//         duration: newWrite.duration,
//         cost: newWrite.cost,
//         categoriesId: newWrite.categoriesId,
//         colorId: newWrite.colorId,
//       },
//       message: "Услуга успешно обновлена",
//     };
//     res.status(200).json(userData);
//   } catch (e) {
//     res.status(500).send({
//       message: ERROR_MESSAGE_STATUS_500,
//     });
//   }
// };

// module.exports.delet = async (req, res) => {
//   console.log(req.body);
//   try {
//     await ServiceModels.deleteOne({
//       _id: req.body._id,
//     });
//     res
//       .status(200)
//       .json({ _id: req.body._id, message: "Услуга успешно удалена" });
//   } catch (e) {
//     res.status(500).send({
//       message: ERROR_MESSAGE_STATUS_500,
//     });
//   }
// };