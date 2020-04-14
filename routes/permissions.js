const express = require("express");
const router = express.Router();

const { permissions } = require("../classes/permissions");

/**
 * 取得權限列表
 * GET: /api/v1/permissions
 */
router.get("/", async function (req, res, next) {
  res.status(200).json(permissions);
});

module.exports = router;
