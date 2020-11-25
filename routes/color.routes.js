const { Router } = require("express");

const router = Router();
const passport = require("passport");
const controller = require("../controllers/ColorController");

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  controller.create
);
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  controller.read
);

module.exports = router;
