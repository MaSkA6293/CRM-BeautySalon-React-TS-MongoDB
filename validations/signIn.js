const { check } = require('express-validator')

const signInValidation = [
    check("email", "Введите корректный email").normalizeEmail().isEmail(),
    check("password", "Введите пароль").exists(),
]

module.exports = signInValidation