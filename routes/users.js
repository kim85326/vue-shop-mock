const express = require("express");
const router = express.Router();

const userModel = require("../models/userModel");
const { convertToUserContent } = require("../classes/converters");

/**
 * 取得使用者列表
 * GET: /api/v1/users
 */
router.get("/", async function (req, res, next) {
  console.log(userModel.users);
  const page = req.query.page || 1;
  const pageSize = req.query.pageSize || 20;
  const keyword = req.query.keyword || "";

  let matchedUsers = userModel.users;
  if (keyword !== "") {
    matchedUsers = matchedUsers.filter((user) => user.username.includes(keyword) || user.name.includes(keyword));
  }

  const startIndex = (page - 1) * pageSize;
  const endIndex = page * pageSize;
  const matchedPaginationUsers = matchedUsers.slice(startIndex, endIndex);

  const userContents = matchedPaginationUsers.map(convertToUserContent);

  res.append("X-Page", page);
  res.append("X-Page-Size", pageSize);
  res.append("X-Total", matchedUsers.length);
  res.status(200).json(userContents);
});

/**
 * 取得使用者
 * GET: /api/v1/users/:id
 */
router.get("/:id", async function (req, res, next) {
  const existedUser = userModel.getById(Number(req.params.id));

  if (!existedUser) {
    res.status(404).send();
  }

  const userContent = convertToUserContent(existedUser);

  res.status(200).json(userContent);
});

/**
 * 新增使用者
 * POST: /api/v1/users
 */
router.post("/", async function (req, res, next) {
  const { roleId, username, name, email, password, remark } = req.body;
  // 驗證輸入
  console.log(roleId);
  const now = new Date().toISOString();

  const user = {
    id: ++userModel.lastId,
    roleId,
    username,
    name,
    email,
    password,
    isEnabled: false,
    remark,
    createdTime: now,
    latestLoginTime: null,
  };

  userModel.users.push(user);

  res.status(201).json(convertToUserContent(userModel.users[userModel.users.length - 1]));
});

/**
 * 更新使用者
 * PATCH: /api/v1/users/:id
 */
router.patch("/:id", async function (req, res, next) {
  const existedUser = userModel.getById(Number(req.params.id));

  if (!existedUser) {
    res.status(404).send();
  }

  // 驗證輸入
  const roleId = req.body.roleId || existedUser.roleId;
  const username = req.body.username || existedUser.username;
  const name = req.body.name || existedUser.name;
  const email = req.body.email || existedUser.email;
  const password = req.body.password || existedUser.password;
  const isEnabled = req.body.isEnabled !== undefined ? req.body.isEnabled : existedUser.isEnabled;
  const remark = req.body.remark || existedUser.remark;

  const user = {
    ...existedUser,
    roleId,
    username,
    name,
    email,
    password,
    isEnabled,
    remark,
  };

  const existedUserIndex = userModel.users.findIndex((user) => user.id === Number(req.params.id));
  userModel.users[existedUserIndex] = user;

  const userContent = convertToUserContent(user);

  res.status(200).json(userContent);
});

/**
 * 啟用使用者
 * PUT: /api/v1/users/{id}/enabled
 */
router.put("/:id/enabled", async function (req, res, next) {
  const existedUser = userModel.getById(Number(req.params.id));

  if (!existedUser) {
    res.status(404).send();
  }

  existedUser.isEnabled = true;

  const existedUserIndex = userModel.users.findIndex((user) => user.id === Number(req.params.id));
  userModel.users[existedUserIndex] = existedUser;

  res.status(204).send();
});

/**
 * 停用使用者
 * DELETE: /api/v1/users/{id}/enabled
 */
router.delete("/:id/enabled", async function (req, res, next) {
  const existedUser = userModel.getById(Number(req.params.id));

  if (!existedUser) {
    res.status(404).send();
  }

  existedUser.isEnabled = false;

  const existedUserIndex = userModel.users.findIndex((user) => user.id === Number(req.params.id));
  userModel.users[existedUserIndex] = existedUser;

  res.status(204).send();
});

/**
 * 刪除使用者
 * DELETE: /api/v1/users/{id}
 */
router.delete("/:id", async function (req, res, next) {
  const existedUserIndex = userModel.users.findIndex((user) => user.id === Number(req.params.id));

  if (existedUserIndex === -1) {
    res.status(404).send();
  }

  userModel.users.splice(existedUserIndex, 1);

  res.status(204).send();
});

module.exports = router;
