const { check } = require("express-validator");

const addNewClientValidation = [
  check("name", "Введите имя")
    .isString()
    .isLength({ min: 2, max: 20 })
    .withMessage("Допустимое количество символов в имени от 2 до 20"),
  check("surname", "Введите фамилию")
    .isString()
    .isLength({ min: 2, max: 20 })
    .withMessage("Допустимое количество символов в фамилии от 2 до 20"),
  check("phone")
    .isString()
    .isLength(11)
    .withMessage("Не корректный номер телефона"),
];

module.exports = addNewClientValidation;
