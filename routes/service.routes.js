const { Router } = require("express");
const router = Router();
const ServiceController = require("../controllers/ServiceController");
const passport = require("passport");

const { check } = require("express-validator");
router.post(
  "/",
  passport.authenticate("jwt", {
    session: false,
  }),
  [
    check("name", "Поле Название услуги обязательное").notEmpty(),
    check("cost", "Поле Цена обязательное. Значение число.").notEmpty().isInt(),
    check("duration", "Не коректное значение в поле Время").isArray({
      min: 2,
      max: 2,
    }),
    check("colorId", "Поле Цвет не указано").notEmpty(),
  ],
  ServiceController.add
);
router.get(
  "/",
  passport.authenticate("jwt", {
    session: false,
  }),
  ServiceController.getAllServices
);

// router.post(
//   "/",
//   passport.authenticate("jwt", {
//     session: false,
//   }),
//   ClientController.add
// );
// router.get(
//   "/",
//   passport.authenticate("jwt", {
//     session: false,
//   }),
//   ClientController.allClients
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
