const { Router } = require("express");
const router = Router();
const controller = require("../controllers/ColorController");
const passport = require("passport");

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
