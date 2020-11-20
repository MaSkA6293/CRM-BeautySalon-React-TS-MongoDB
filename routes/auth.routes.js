const { Router } = require("express");

const router = Router();

const controller = require("../controllers/AuthController");
const signUpValidation = require('../validations/signUp')
const signInValidation = require('../validations/signIn')

router.post("/signUp", signUpValidation, controller.signUp);
router.post("/signIn", signInValidation, controller.signIn);
router.get("/verify", controller.verify)
router.post("/refresh", controller.refresh);

module.exports = router;
