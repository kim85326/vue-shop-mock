const express = require("express");
const router = express.Router();

const { sleep } = require("../classes/utils");
const { convertToRoleSummaryContent, convertToRoleContent } = require("../classes/converters");
const roleModel = require("../models/roleModel");

/**
 * 取得所有角色摘要
 * GET: /api/v1/roles/summaries
 */
router.get("/summaries", async function (req, res, next) {
  const rolesSummariesContents = roleModel.roles.map(convertToRoleSummaryContent);

  res.status(200).json(rolesSummariesContents);
});

/**
 * 取得角色列表
 * GET: /api/v1/roles
 */
router.get("/", async function (req, res, next) {
  console.log(roleModel.roles);
  const page = req.query.page || 1;
  const pageSize = req.query.pageSize || 20;

  let matchedRoles = roleModel.roles;

  const startIndex = (page - 1) * pageSize;
  const endIndex = page * pageSize;
  const matchedPaginationRoles = matchedRoles.slice(startIndex, endIndex);

  const roleContents = matchedPaginationRoles.map(convertToRoleContent);

  res.append("X-Page", page);
  res.append("X-Page-Size", pageSize);
  res.append("X-Total", matchedRoles.length);
  res.status(200).json(roleContents);
});

/**
 * 取得角色
 * GET: /api/v1/roles/:id
 */
router.get("/:id", async function (req, res, next) {
  const existedRole = roleModel.getById(Number(req.params.id));

  if (!existedRole) {
    res.status(404).send();
  }

  const roleContent = convertToRoleContent(existedRole);

  res.status(200).json(roleContent);
});

/**
 * 新增角色
 * POST: /api/v1/roles
 */
router.post("/", async function (req, res, next) {
  const { name, description, permissions } = req.body;
  // 驗證輸入

  const now = new Date().toISOString();

  const role = {
    id: ++roleModel.lastId,
    name,
    description,
    permissions,
    createdTime: now,
  };

  roleModel.roles.push(role);

  res.status(201).json(role);
});

/**
 * 更新角色
 * PATCH: /api/v1/roles/:id
 */
router.patch("/:id", async function (req, res, next) {
  const existedRole = roleModel.roles.find((role) => role.id === Number(req.params.id));

  if (!existedRole) {
    res.status(404).send();
  }

  // 驗證輸入
  const name = req.body.name || existedRole.name;
  const description = req.body.description || existedRole.description;
  const permissions = req.body.permissions || existedRole.permissions;

  const role = {
    ...existedRole,
    name,
    description,
    permissions,
  };

  const existedRoleIndex = roleModel.roles.findIndex((role) => role.id === Number(req.params.id));
  roleModel.roles[existedRoleIndex] = role;

  const roleContent = convertToRoleContent(role);

  res.status(200).json(roleContent);
});

/**
 * 刪除角色
 * DELETE: /api/v1/roles/{id}
 */
router.delete("/:id", async function (req, res, next) {
  const existedRoleIndex = roleModel.roles.findIndex((role) => role.id === Number(req.params.id));

  if (existedRoleIndex === -1) {
    res.status(404).send();
  }

  roleModel.roles.splice(existedRoleIndex, 1);

  res.status(204).send();
});

module.exports = router;
