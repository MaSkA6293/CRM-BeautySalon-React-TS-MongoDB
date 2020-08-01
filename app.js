const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const config = require("config");

const ClientController = require("./controllers/ClientController");

const ColorController = require("./controllers/ColorController");

const TaskController = require("./controllers/TaskController");

const ListController = require("./controllers/ListsController");

const app = express();

app.use(function (req, res, next) {
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const PORT = process.env.PORT || config.get("port");

async function start() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || config.get("mongoURI"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

    app.listen(PORT, function () {
      console.log(`App has been started on port: ${PORT}`);
    });
  } catch (e) {
    console.log("Server error", e.message);
    process.exit();
  }
}

start();

app.get("/clients", ClientController.read);
app.post("/clients", ClientController.create);
app.delete("/clients/:id", ClientController.delete);
app.put("/clients/:id", ClientController.update);

app.post("/colors", ColorController.create);
app.get("/colors", ColorController.read);

app.post("/tasks", TaskController.create);
app.get("/tasks", TaskController.read);
app.put("/tasks/:id", TaskController.update);
app.delete("/tasks/:id", TaskController.delete);

app.post("/lists", ListController.create);
app.get("/lists", ListController.read);
app.delete("/lists/:id", ListController.delete);
app.put("/lists/:id", ListController.update);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client", "build")));
  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

module.exports = app;
