const TaskModels = require("../models/Task");

const TaskController = {
  create(req, res) {
    const task = new TaskModels({
      listId: req.body.listId,
      text: req.body.text,
      completed: req.body.completed,
    });

    task.save().then((data) => res.json(data));
  },

  read(req, res) {
    TaskModels.find()
      .then((result) => {
        res.json(result);
      })
      .catch((e) => res.send("No result"));
  },

  update(req, res) {
    const query = { _id: req.params.id };
    const update = req.body;
    TaskModels.findOneAndUpdate(query, update)
      .then(() => res.send({ status: "OK" }))
      .catch(() => res.send({ status: "false" }));
  },

  delete(req, res) {
    TaskModels.deleteOne({
      _id: req.params.id,
    })
      .then((result) => res.json({ status: "deleted" }))
      .catch((e) => res.json({ status: "error" }));
  },
};
module.exports = TaskController;
