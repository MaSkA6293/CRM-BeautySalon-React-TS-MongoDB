const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const compression = require("compression");
const morgan = require("morgan");
const passport = require("passport");
require("dotenv").config();
const errorHandler = require("./middleware/errorHandler");
const authRoutes = require("./routes/auth.routes");
const clientRoutes = require("./routes/client.routes");
const colorRoutes = require("./routes/color.routes");
const serviceRoutes = require("./routes/service.routes");
const serviceCategoryesRoutes = require("./routes/serviceCategory.routes");
const eventsRoutes = require("./routes/eventsRoutes.routes");

const app = express();

app.set("view engine", "ejs");
app.use(express.static(`${__dirname}/public`));
app.use(morgan("tiny"));
app.use(compression());
app.use(passport.initialize());
require("./middleware/passport/passport")(passport);

app.use((_req, res, next) => {
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

async function start() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

    app.listen(process.env.PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`App has been started on port: ${process.env.PORT}`);
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("Server error", error.message);
    // eslint-disable-next-line unicorn/no-process-exit
    process.exit();
  }
}

start();
app.use("/api/auth", authRoutes);
app.use("/api/client", clientRoutes);
app.use("/api/color", colorRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/services/categories", serviceCategoryesRoutes);
app.use("/api/calendar/events", eventsRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client", "build")));
  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

app.use(errorHandler);

module.exports = app;
