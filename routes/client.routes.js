const { Router } = require("express");

const router = Router();
const passport = require("passport");
const ClientController = require("../controllers/ClientController");

const addNewClientValidation = require("../validations/addNewClient");

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
  }),
  addNewClientValidation,
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
