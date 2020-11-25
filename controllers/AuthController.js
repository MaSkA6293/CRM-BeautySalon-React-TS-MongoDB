const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const jwt_decode = require("jwt-decode");
const User = require("../models/User");
const sendMail = require("../utils/sendEmail");
const generateMD5 = require("../utils/generateHash");
const { ERROR_MESSAGE_STATUS_500 } = require("../constants");

module.exports.getUser = async (req, res) => {
  try {
    // eslint-disable-next-line no-underscore-dangle
    res.status(200).json({ id: req.user._id });
  } catch {
    res.status(404).json({ message: ERROR_MESSAGE_STATUS_500 });
  }
};

module.exports.verify = async (req, res) => {
  try {
    const { hash } = req.query;
    if (hash.length !== 32) {
      return res.status(500).json({ message: ERROR_MESSAGE_STATUS_500 });
    }
    const user = await User.findOne({ confirmed_hash: hash });
    if (user) {
      if (!user.confirmed) {
        user.confirmed = true;
        await user.save();
      }
      return res.render("confirm", {
        title: "Подтверждение учетной записи",
        status: "успешно подтверждена",
      });
    }
    return res.status(404).send();
  } catch {
    return res.status(500).json({ message: ERROR_MESSAGE_STATUS_500 });
  }
};

module.exports.signUp = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(401).json({
        errors: errors.array(),
        message: "Не корректные данные при регистрации",
      });
    }
    const { email, password } = req.body;
    const candidate = await User.findOne({ email });
    if (candidate) {
      return res
        .status(401)
        .json({ message: "Пользователь с таким Email уже существует" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      email,
      password: hashedPassword,
      confirmed_hash: generateMD5(process.env.MD5SECRET_KEY),
    });
    sendMail({
      from: "admin@beautySalon.com",
      to: user.email,
      subject: "Подтверждение почты CRM",
      html: `Для того, чтобы подтвердить почту, перейдите <a href="http://localhost:${process.env.PORT}/api/auth/verify?hash=${user.confirmed_hash}">по этой ссылке</a>`,
    });
    await user.save();

    return res.status(200).json({
      message: "Вы успешно зарегистрировались, теперь Вы можете войти",
    });
  } catch {
    return res.status(500).json({ message: ERROR_MESSAGE_STATUS_500 });
  }
};

module.exports.signIn = async (req, res) => {
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
      process.env.JWTSECRET,
      { expiresIn: "1h" }
    );
    const refresh_token = jwt.sign(
      { userId: user.id, email: user.email, payload: token },
      process.env.JWTREFRESH,
      { expiresIn: "30 days" }
    );
    const update = { refresh_token };
    await User.findOneAndUpdate({ _id: user._id }, update);
    return res.status(200).json({
      token: `Bearer ${token}`,
      refresh_token,
      user: { id: user._id },
    });
  } catch {
    return res.status(500).json({ message: ERROR_MESSAGE_STATUS_500 });
  }
};

module.exports.refresh = async (req, res) => {
  try {
    const { refresh_token } = req.body;
    const { userId } = jwt_decode(refresh_token);
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(400).json({ message: "Error token" });
    }
    const decodedToken = jwt.verify(
      refresh_token,
      process.env.JWTREFRESH,
      (err, decoded) => {
        if (err) {
          return false;
        }
        return decoded;
      }
    );
    if (!decodedToken) {
      return res.status(400).json({ message: "Error token" });
    }

    if (user.refresh_token === refresh_token) {
      const newToken = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWTSECRET,
        { expiresIn: "1h" }
      );
      const newRefresh_token = jwt.sign(
        { userId: user.id, email: user.email, payload: newToken },
        process.env.JWTREFRESH,
        { expiresIn: "30 days" }
      );
      const update = { refresh_token: newRefresh_token };
      await User.findOneAndUpdate({ _id: user._id }, update);
      return res.status(200).json({
        token: `Bearer ${newToken}`,
        refresh_token: newRefresh_token,
      });
    }
    return res.status(400).json({ message: "Error token" });
  } catch {
    return res.status(500).json({ message: ERROR_MESSAGE_STATUS_500 });
  }
};
