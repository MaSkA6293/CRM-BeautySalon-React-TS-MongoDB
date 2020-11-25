const { Router } = require("express");

const router = Router();
const passport = require("passport");

const { check } = require("express-validator");
const CategoryController = require("../controllers/CategoryController");

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

router.put(
  "/",
  passport.authenticate("jwt", {
    session: false,
  }),
  CategoryController.update
);

router.delete(
  "/",
  passport.authenticate("jwt", {
    session: false,
  }),
  CategoryController.delet
);

module.exports = router;
