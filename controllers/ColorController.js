const ColorsModels = require("../models/Color");

const { ERROR_MESSAGE_STATUS_500 } = require("../constants");

module.exports.create = async (req, res) => {
  try {
    const color = new ColorsModels({
      id: req.body.id,
      hex: req.body.hex,
    });
    await color.save();
    res.status(200).json("success");
  } catch {
    res.status(500).json({
      message: ERROR_MESSAGE_STATUS_500,
    });
  }
};

module.exports.read = async (req, res) => {
  try {
    const colors = await ColorsModels.find();
    res.status(200).json(colors);
  } catch {
    res.status(500).json({
      message: ERROR_MESSAGE_STATUS_500,
    });
  }
};
