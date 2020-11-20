const { check } = require('express-validator')

const signUpValidation = [
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
]

module.exports = signUpValidation