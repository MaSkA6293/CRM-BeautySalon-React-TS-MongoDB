const { Router } = require("express");
const router = Router();
const ServiceController = require("../controllers/ServiceController");
const passport = require("passport");

// name: String,
// duration: Array,
// cost: Number,
// colorId: String,
// categoriesId: Array,
// userId: String,

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
