const ColorsModels = require("../models/Color");

const { ERROR_MESSAGE_STATUS_500 } = require("../constants");

module.exports.create = async (req, res) => {
  try {
    const color = new ColorsModels({
      id: req.body.id,
      hex: req.body.hex,
    });
    await color.save();
    res.status(200).send("success");
  } catch (e) {
    res.status(500).send({
      message: ERROR_MESSAGE_STATUS_500,
    });
  }
};

module.exports.read = async (req, res) => {
  try {
    const colors = await ColorsModels.find();
    res.json(colors);
  } catch (e) {
    res.status(500).send({
      message: ERROR_MESSAGE_STATUS_500,
    });
  }
};
