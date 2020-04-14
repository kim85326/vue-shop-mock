const jwt = require("jsonwebtoken");

const { tokenSecret } = require("../config");
const userModel = require("../models/userModel");

exports.loadCurrentUserMiddleware = function (req, res, next) {
  const token = req.headers["x-access-token"];

  if (token) {
    try {
      const { username } = jwt.verify(token, tokenSecret);
      const existedUser = userModel.getByUsername(username);
      req.currentUser = existedUser;
    } catch (error) {
      console.log(error);
      return res.status(403).send({
        error_code: 1004,
        error_message: "無效的 token",
      });
    }
  }

  next();
};

exports.authMiddleware = function (req, res, next) {
  if (!req.currentUser) {
    return res.status(403).send({
      error_code: 1005,
      error_message: "用戶未登入",
    });
  }

  next();
};
