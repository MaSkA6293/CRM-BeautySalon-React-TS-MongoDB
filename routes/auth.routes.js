const { Router } = require("express");
const router = Router();

const { check } = require("express-validator");
const controller = require("../controllers/AuthController");

router.post(
  "/register",
  [
    check("email", "Введите корректный email").normalizeEmail().isEmail(),
    check("password", "Минимальная длина пароля 6 символов").isLength({
      min: 6,
    }),
  ],
  controller.register
);

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
