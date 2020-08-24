const { ERROR_MESSAGE_STATUS_500 } = require("../constants");
const ServiceModels = require("../models/Service");

module.exports.add = async (req, res) => {
  try {
    const service = new ServiceModels({
      name: req.body.name,
      hours: req.body.hours,
      minutes: req.body.minutes,
      price: req.body.price,
      color: req.body.color,
      userId: req.user._id,
    });
    const result = await service.save();
    res.status(200).json(result);
  } catch (e) {
    res.status(500).json({
      message: ERROR_MESSAGE_STATUS_500,
    });
  }
};

// module.exports.allClients = async (req, res) => {
//   try {
//     const clients = await ClientModel.find({ userId: req.user._id });
//     const userData = clients.map((item) => {
//       return {
//         _id: item._id,
//         name: item.name,
//         female: item.female,
//         phone: item.phone,
//         color: item.color,
//       };
//     });
//     res.status(200).json(userData);
//   } catch (e) {
//     res.status(500).send({
//       message: ERROR_MESSAGE_STATUS_500,
//     });
//   }
// };

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
