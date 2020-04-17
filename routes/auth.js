const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();

const userModel = require("../models/userModel");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { tokenSecret } = require("../config");
const { convertToUserContent } = require("../classes/converters");

// 登入
router.post("/", function (req, res, next) {
  const { username, password } = req.body;

  const existedUser = userModel.getByUsername(username);

  if (!existedUser) {
    res.status(401).json({ error_code: 1001, error_message: "帳號錯誤" });
    return;
  }

  if (existedUser.password !== password) {
    res.status(401).json({ error_code: 1002, error_message: "密碼錯誤" });
    return;
  }

  if (existedUser.isEnabled === false) {
    res.status(401).json({ error_code: 1003, error_message: "此用戶已停用" });
    return;
  }

  const now = new Date().toISOString();
  const user = {
    ...existedUser,
    latestLoginTime: now,
  };

  const existedUserIndex = userModel.users.findIndex((user) => user.id === existedUser.id);
  userModel.users[existedUserIndex] = user;

  try {
    const token = jwt.sign({ username: user.username }, tokenSecret, {
      expiresIn: "1h",
    });
    return res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    return res.status(403).send({
      error_code: 1004,
      error_message: "簽發失敗",
    });
  }
});

// 登出
router.delete("/", authMiddleware, function (req, res, next) {
  res.status(204).send();
});

// 取得當前使用者
router.get("/current-user", authMiddleware, function (req, res, next) {
  const userContent = convertToUserContent(req.currentUser);

  res.status(200).json(userContent);
});

module.exports = router;
