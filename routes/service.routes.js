const { Router } = require("express");
const router = Router();
const ServiceController = require("../controllers/ServiceController");
const passport = require("passport");

router.post(
  "/",
  passport.authenticate("jwt", {
    session: false,
  }),
  ServiceController.add
);

// router.get(
//   "/",
//   passport.authenticate("jwt", {
//     session: false,
//   }),
//   ClientController.allClients
// );
// router.post(
//   "/",
//   passport.authenticate("jwt", {
//     session: false,
//   }),
//   ClientController.add
// );

// router.delete(
//   "/:id",
//   passport.authenticate("jwt", {
//     session: false,
//   }),
//   ClientController.delet
// );

// router.put(
//   "/:id",
//   passport.authenticate("jwt", {
//     session: false,
//   }),
//   ClientController.update
// );

module.exports = router;
