const { ERROR_MESSAGE_STATUS_500 } = require("../constants");
const ServiceModels = require("../models/Service");

const { validationResult } = require("express-validator");

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
    res.status(200).json(answer);
  } catch (e) {
    res.status(500).json({
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
  } catch (e) {
    res.status(500).send({
      message: ERROR_MESSAGE_STATUS_500,
    });
  }
};

// module.exports.delet = async (req, res) => {
//   try {
//     await ClientModel.deleteOne({
//       _id: req.params.id,
//     });
//     res
//       .status(200)
//       .json({ id: req.params.id, message: "Клиент успешно удален" });
//   } catch (e) {
//     res.status(500).json({
//       message: ERROR_MESSAGE_STATUS_500,
//     });
//   }
// };

// module.exports.update = async (req, res) => {
//   try {
//     const query = { _id: req.params.id };
//     const update = req.body;
//     const newWrite = await ClientModel.findOneAndUpdate(query, update, {
//       new: true,
//     });

//     const userData = {
//       _id: newWrite._id,
//       name: newWrite.name,
//       female: newWrite.female,
//       phone: newWrite.phone,
//       color: newWrite.color,
//     };
//     res.status(200).json(userData);
//   } catch (e) {
//     res.send({ error: ERROR_MESSAGE_STATUS_500 });
//   }
// };
