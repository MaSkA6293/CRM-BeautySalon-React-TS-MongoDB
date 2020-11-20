const { Router } = require("express");
const router = Router();

const { check } = require("express-validator");
const controller = require("../controllers/AuthController");

router.post(
  "/signUp",
  [
    check("email", "Введите корректный email").normalizeEmail().isEmail(),
    check("password", "Минимальная длина пароля 6 символов").isLength({
      min: 6,
    }).custom((value, { req }) => {
      if (value !== req.body.password2) {
        throw new Error('Пароли не совпадают');
      }
      else {
        return value;
      }
    }
    )
  ],
  controller.signUp
);

router.get("/verify", controller.verify)


router.post(
  "/login",
  [
    check("email", "Введите корректный email").normalizeEmail().isEmail(),
    check("password", "Введите пароль").exists(),
  ],
  controller.login
);

router.post("/refresh", controller.refresh);

module.exports = router;
