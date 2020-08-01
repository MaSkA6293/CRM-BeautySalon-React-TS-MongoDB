const ListModels = require("../models/List");

const ListController = {
  create(req, res) {
    const list = new ListModels({
      name: req.body.name,
      colorId: req.body.colorId,
    });

    list.save().then((data) => res.json(data));
  },

  delete(req, res) {
    ListModels.deleteOne({
      _id: req.params.id,
    })
      .then((result) => res.json({ status: "deleted" }))
      .catch((e) => res.json({ status: "error" }));
  },

  read(req, res) {
    ListModels.find()
      .then((result) => {
        res.json(result);
      })
      .catch((e) => res.send("No result"));
  },

  update(req, res) {
    const query = { _id: req.params.id };
    const update = req.body;
    ListModels.findOneAndUpdate(query, update)
      .then(() => res.send({ status: "OK" }))
      .catch(() => res.send({ status: "false" }));
  },
};
module.exports = ListController;
