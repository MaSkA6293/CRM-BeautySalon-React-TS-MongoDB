//const ListModels = require("../models/List");
const ERROR_MESSAGE = "Ошибка сервера. Что-то пошло не так...";
const ClientModel = require("../models/Client");

const ClientController = {
  create(req, res) {
    const client = new ClientModel({
      name: req.body.name,
      female: req.body.female,
      phone: req.body.phone,
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
