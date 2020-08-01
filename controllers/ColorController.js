const ColorsModels = require("../models/Color");

const ColorController = {
  create(req, res) {
    const color = new ColorsModels({
      id: req.body.id,
      hex: req.body.hex,
      name: req.body.name,
    });

    color
      .save()
      .then(() => console.log("succsess!"))
      .then(() => res.send("finish"));
  },

  read(req, res) {
    ColorsModels.find()
      .then((result) => {
        res.json(result);
      })
      .catch((e) => res.send("No result"));
  },
};
module.exports = ColorController;
