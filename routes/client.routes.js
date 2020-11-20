const { Router } = require("express");
const router = Router();
const ERROR_MESSAGE = "Ошибка сервера. Что-то пошло не так...";
const ClientController = require("../controllers/ClientController");
const passport = require("passport");
const { check } = require("express-validator");
const addNewClientValidation = require('../validations/addNewClient')
router.get(
  "/",
  passport.authenticate("jwt", {
    session: false,
  }),
  ClientController.allClients
);

router.post(
  "/",
  passport.authenticate("jwt", {
    session: false,
  }), addNewClientValidation,
  ClientController.add
);


router.delete(
  "/:id",
  passport.authenticate("jwt", {
    session: false,
  }),
  ClientController.delet
);

router.put(
  "/:id",
  passport.authenticate("jwt", {
    session: false,
  }),
  ClientController.update
);

module.exports = router;
