const { check } = require("express-validator");

const eventValidation = [
  check("title")
    .notEmpty()
    .isString()
    .isLength({ min: 1, max: 20 })
    .withMessage(
      "Значение должно быть строкой. Поле должно быть заполнено. Max 20 символов"
    ),
  check("day")
    .isString()
    .isLength({ min: 10, max: 10 })
    .withMessage("Не корректная дата"),
  check("start")
    .isString()
    .isLength({ min: 5, max: 5 })
    .withMessage("Не корректная дата начала события"),
  check("end")
    .isString()
    .isLength({ min: 5, max: 5 })
    .withMessage("Не корректная дата окончания события"),
  check("color").isString().notEmpty().withMessage("Поле цвет обязательное"),
  check("clientId").isString().withMessage("Значение должно быть строкой"),
];

module.exports = eventValidation;
