const { Router } = require("express");
const router = Router();
const CategoryController = require("../controllers/CategoryController");
const passport = require("passport");

const { check } = require("express-validator");
router.post(
  "/",
  passport.authenticate("jwt", {
    session: false,
  }),
  [
    check("name", "Поле Название услуги обязательное").notEmpty(),
    check("colorId", "Поле Цвет не указано").notEmpty(),
  ],
  CategoryController.add
);
router.get(
  "/",
  passport.authenticate("jwt", {
    session: false,
  }),
  CategoryController.getAllCategories
);

// router.put(
//   "/",
//   passport.authenticate("jwt", {
//     session: false,
//   }),
//   ServiceController.update
// );

// router.delete(
//   "/",
//   passport.authenticate("jwt", {
//     session: false,
//   }),
//   ServiceController.delet
// );

module.exports = router;
