const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const { validationResult } = require("express-validator");
module.exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(401).json({
        errors: errors.array(),
        message: "Не корректные данные при регистрации",
      });
    }
    const candidate = await User.findOne({ email });
    if (candidate) {
      return res
        .status(401)
        .json({ message: "Пользователь с таким Email уже существует" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({ email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: "Пользователь создан" });
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
};

module.exports.login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(401).json({
        message: "Не корректные данные при входе в систему",
      });
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Не корректные данные" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Не корректные данные" });
    }
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      config.get("jwtSecret"),
      { expiresIn: "1h" }
    );
    res.status(200).json({ token: `Bearer ${token}`, userId: user.id });
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
};
