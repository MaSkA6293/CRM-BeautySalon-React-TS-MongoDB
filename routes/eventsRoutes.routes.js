const { Router } = require("express");

const router = Router();
const passport = require("passport");
const EventController = require("../controllers/EventController");

const eventValidation = require("../validations/event");

router.get(
  "/",
  passport.authenticate("jwt", {
    session: false,
  }),
  EventController.allEvents
);

router.post(
  "/",
  passport.authenticate("jwt", {
    session: false,
  }),
  eventValidation,
  EventController.add
);

router.delete(
  "/:id",
  passport.authenticate("jwt", {
    session: false,
  }),
  EventController.delet
);

router.put(
  "/:id",
  passport.authenticate("jwt", {
    session: false,
  }),
  EventController.update
);

module.exports = router;
