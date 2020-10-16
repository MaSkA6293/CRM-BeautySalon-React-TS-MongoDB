const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const { validationResult } = require("express-validator");
module.exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const errors = validationResult(req.body);
    console.log(email,)
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
    res.status(200).json({ message: "Пользователь успешно зарегистрирован" });
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
      process.env.JWTSECRET || config.get("jwtSecret"),
      { expiresIn: "10m" }
    );
    const refresh_token = jwt.sign(
      { userId: user.id, email: user.email, payload: token },
      process.env.JWTREFRESH || config.get("jwtRefresh"),
      { expiresIn: "2 days" }
    );
    const update = { refresh_token: refresh_token };
    await User.findOneAndUpdate({ _id: user._id }, update);
    res.status(200).json({
      token: `Bearer ${token}`,
      userId: user.id,
      refresh_token,
    });
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
};

module.exports.refresh = async (req, res) => {
  try {
    const { refresh_token, id } = req.body;
    const user = await User.findOne({ _id: id });
    if (!user) {
      return res.status(400).end();
    }
    const decoded = jwt.verify(
      refresh_token,
      process.env.JWTREFRESH || config.get("jwtRefresh"),
      function (err, decoded) {
        if (err) {
          return false;
        }
        return decoded;
      }
    );
    if (!decoded) {
      return res.status(400).end();
    }

    if (user.refresh_token === refresh_token) {
      const newToken = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWTSECRET || config.get("jwtSecret"),
        { expiresIn: "10m" }
      );
      const newRefresh_token = jwt.sign(
        { userId: user.id, email: user.email, payload: newToken },
        process.env.JWTREFRESH || config.get("jwtRefresh"),
        { expiresIn: "2 days" }
      );
      const update = { refresh_token: newRefresh_token };
      const newWrite = await User.findOneAndUpdate({ _id: user._id }, update);
      return res.status(200).json({
        token: `Bearer ${newToken}`,
        userId: user.id,
        refresh_token: newRefresh_token,
      });
    } else {
      return res.status(400).end();
    }
  } catch (e) {
    return res.status(500).json({ message: "Server error" });
  }
};
