const jwt = require("jsonwebtoken");

const { tokenSecret } = require("../config");
const userModel = require("../models/userModel");

const parseToken = (req) => {
  const bearerHeader = req.headers.authorization;
  if (bearerHeader) {
    return bearerHeader.split(" ")[1];
  }

  const token = req.headers["x-access-token"];
  if (token) {
    return token;
  }

  return undefined;
};

exports.loadCurrentUserMiddleware = function (req, res, next) {
  const token = parseToken(req);

  if (token) {
    try {
      const { username } = jwt.verify(token, tokenSecret);
      const existedUser = userModel.getByUsername(username);
      req.currentUser = existedUser;
    } catch (error) {
      return res.status(401).send({
        error_code: 1004,
        error_message: "無效的 token",
      });
    }
  }

  next();
};

exports.authMiddleware = function (req, res, next) {
  if (!req.currentUser) {
    return res.status(401).send({
      error_code: 1005,
      error_message: "用戶未登入",
    });
  }

  next();
};
