const express = require("express");
const router = express.Router();

const { sleep } = require("../classes/utils");

const users = [
  {
    id: 1,
    username: "hello123",
    name: "李正赫",
    email: "hello123@gmail.com",
    isEnabled: true,
    remark: "朝鮮人民軍總政治局局長的小兒子，現任民警大隊第五中隊大尉中隊長",
    createdTime: "2018-09-29T13:55:30",
    latestLoginTime: "2018-09-29T13:55:39",
  },
  {
    id: 2,
    username: "elaine123",
    name: "尹世理",
    email: "elaine@gmail.com",
    isEnabled: true,
    remark: "韓國女王集團會長的小女兒",
    createdTime: "2019-10-06T15:02:51",
    latestLoginTime: "2019-10-06T15:53:51",
  },
  {
    id: 3,
    username: "hi123",
    name: "徐丹",
    email: "h123@gmail.com",
    isEnabled: false,
    remark: "",
    createdTime: "2018-09-29T13:55:30",
    latestLoginTime: null,
  },
  {
    id: 50,
    username: "ssssssskkkkkkkkk123",
    name: "阿爾貝托",
    email: "dddddeeeeeeeeeegggggg123@gmail.com",
    isEnabled: true,
    remark: "英籍企業家，打算與世理結婚",
    createdTime: "2019-04-20T12:45:16",
    latestLoginTime: null,
  },
];
let lastId = 50;

const convertToUserContent = ({ id, username, name, email, isEnabled, remark, createdTime, latestLoginTime }) => ({
  id,
  username,
  name,
  email,
  isEnabled,
  remark,
  createdTime,
  latestLoginTime,
});

/**
 * 取得使用者列表
 * GET: /api/v1/users
 */
router.get("/", async function(req, res, next) {
  console.log(users);
  const page = req.query.page || 1;
  const pageSize = req.query.pageSize || 20;
  const keyword = req.query.keyword || "";

  let matchedUsers = users;
  if (keyword !== "") {
    matchedUsers = users.filter((user) => user.username.includes(keyword) || user.name.includes(keyword));
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
router.get("/:id", async function(req, res, next) {
  const existedUser = users.find((user) => user.id === Number(req.params.id));

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
router.post("/", async function(req, res, next) {
  const { username, name, email, password, remark } = req.body;
  // 驗證輸入

  const now = new Date().toISOString();

  const user = {
    id: ++lastId,
    username,
    name,
    email,
    password,
    isEnabled: false,
    remark,
    createdTime: now,
    latestLoginTime: null,
  };

  users.push(user);

  res.status(201).json(user);
});

/**
 * 更新使用者
 * PATCH: /api/v1/users/:id
 */
router.patch("/:id", async function(req, res, next) {
  const existedUser = users.find((user) => user.id === Number(req.params.id));

  if (!existedUser) {
    res.status(404).send();
  }

  // 驗證輸入
  const username = req.body.username || existedUser.username;
  const name = req.body.name || existedUser.name;
  const email = req.body.email || existedUser.email;
  const password = req.body.password || existedUser.password;
  const isEnabled = req.body.isEnabled !== undefined ? req.body.isEnabled : existedUser.isEnabled;
  const remark = req.body.remark || existedUser.remark;

  const user = {
    ...existedUser,
    username,
    name,
    email,
    password,
    isEnabled,
    remark,
  };

  const existedUserIndex = users.findIndex((user) => user.id === Number(req.params.id));
  users[existedUserIndex] = user;

  const userContent = convertToUserContent(user);

  res.status(200).json(userContent);
});

/**
 * 啟用使用者
 * PUT: /api/v1/users/{id}/enabled
 */
router.put("/:id/enabled", async function(req, res, next) {
  const existedUser = users.find((user) => user.id === Number(req.params.id));

  if (!existedUser) {
    res.status(404).send();
  }

  existedUser.isEnabled = true;

  const existedUserIndex = users.findIndex((user) => user.id === Number(req.params.id));
  users[existedUserIndex] = existedUser;

  res.status(204).send();
});

/**
 * 停用使用者
 * DELETE: /api/v1/users/{id}/enabled
 */
router.delete("/:id/enabled", async function(req, res, next) {
  const existedUser = users.find((user) => user.id === Number(req.params.id));

  if (!existedUser) {
    res.status(404).send();
  }

  existedUser.isEnabled = false;

  const existedUserIndex = users.findIndex((user) => user.id === Number(req.params.id));
  users[existedUserIndex] = existedUser;

  res.status(204).send();
});

/**
 * 刪除使用者
 * DELETE: /api/v1/users/{id}
 */
router.delete("/:id", async function(req, res, next) {
  const existedUserIndex = users.findIndex((user) => user.id === Number(req.params.id));

  if (existedUserIndex === -1) {
    res.status(404).send();
  }

  users.splice(existedUserIndex, 1);

  res.status(204).send();
});

module.exports = router;
