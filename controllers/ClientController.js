//const ListModels = require("../models/List");
const ERROR_MESSAGE = "Ошибка сервера. Что-то пошло не так...";
const ClientModel = require("../models/Client");
const ColorsModels = require("../models/Color");

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
const ClientController = {
  create(req, res) {
    const colors = ColorsModels.find()
      .then((result) => {
        const randomColorId = getRandomIntInclusive(1, 18);
        const color = result.find((item) => item.id === randomColorId);
        const client = new ClientModel({
          name: req.body.name,
          female: req.body.female,
          phone: req.body.phone,
          color: color.hex,
        });
        client
          .save()
          .then((data) => {
            res.json({ status: "OK", data });
          })
          .catch((e) =>
            res.json({
              status: "error",
              error: ERROR_MESSAGE,
            })
          );
      })
      .catch((e) => res.send("Error", e));
  },

  delete(req, res) {
    ClientModel.deleteOne({
      _id: req.params.id,
    })
      .then(() => {
        res.json({ status: "OK", id: req.params.id });
      })
      .catch(() =>
        res.json({
          status: "error",
          error: ERROR_MESSAGE,
        })
      );
  },

  read(req, res) {
    ClientModel.find()
      .then((result) => {
        res.json({ status: "OK", result });
      })
      .catch((e) =>
        res.send({
          status: "error",
          error: ERROR_MESSAGE,
        })
      );
  },

  update(req, res) {
    const query = { _id: req.params.id };
    const update = req.body;
    ClientModel.findOneAndUpdate(query, update)
      .then(() => {
        res.send({ status: "OK", data: update });
      })
      .catch(() => res.send({ status: "error", error: ERROR_MESSAGE }));
  },
};
module.exports = ClientController;
