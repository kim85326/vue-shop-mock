const express = require("express");
const router = express.Router();

const { sleep } = require("../classes/utils");
const { convertToCategorySummaryContent, convertToCategoryContent } = require("../classes/converters");
const categoryModel = require("../models/categoryModel");

/**
 * 取得所有分類摘要
 * GET: /api/v1/categories/summaries
 */
router.get("/summaries", async function (req, res, next) {
  const rolesSummariesContents = categoryModel.categories.map(convertToCategorySummaryContent);

  res.status(200).json(rolesSummariesContents);
});

/**
 * 取得分類列表
 * GET: /api/v1/categories
 */
router.get("/", async function (req, res, next) {
  console.log(categoryModel.categories);
  const page = req.query.page || 1;
  const pageSize = req.query.pageSize || 20;

  let matchedCategories = categoryModel.categories;

  const startIndex = (page - 1) * pageSize;
  const endIndex = page * pageSize;
  const matchedPaginationCategories = matchedCategories.slice(startIndex, endIndex);

  const CategoryContents = matchedPaginationCategories.map(convertToCategoryContent);

  res.append("X-Page", page);
  res.append("X-Page-Size", pageSize);
  res.append("X-Total", matchedCategories.length);
  res.status(200).json(CategoryContents);
});

/**
 * 取得分類
 * GET: /api/v1/categories/:id
 */
router.get("/:id", async function (req, res, next) {
  const existedCategory = categoryModel.getById(Number(req.params.id));

  if (!existedCategory) {
    res.status(404).send();
  }

  const CategoryContent = convertToCategoryContent(existedCategory);

  res.status(200).json(CategoryContent);
});

/**
 * 新增分類
 * POST: /api/v1/categories
 */
router.post("/", async function (req, res, next) {
  const { name } = req.body;
  // 驗證輸入

  const now = new Date().toISOString();

  const category = {
    id: ++categoryModel.lastId,
    name,
    createdTime: now,
  };

  categoryModel.categories.push(category);

  res.status(201).json(category);
});

/**
 * 更新分類
 * PATCH: /api/v1/categories/:id
 */
router.patch("/:id", async function (req, res, next) {
  const existedCategory = categoryModel.categories.find((category) => category.id === Number(req.params.id));

  if (!existedCategory) {
    res.status(404).send();
  }

  // 驗證輸入
  const name = req.body.name || existedCategory.name;

  const category = {
    ...existedCategory,
    name,
  };

  const existedCategoryIndex = categoryModel.categories.findIndex((category) => category.id === Number(req.params.id));
  categoryModel.categories[existedCategoryIndex] = category;

  const CategoryContent = convertToCategoryContent(category);

  res.status(200).json(CategoryContent);
});

/**
 * 刪除分類
 * DELETE: /api/v1/categories/{id}
 */
router.delete("/:id", async function (req, res, next) {
  const existedCategoryIndex = categoryModel.categories.findIndex((category) => category.id === Number(req.params.id));

  if (existedCategoryIndex === -1) {
    res.status(404).send();
  }

  categoryModel.categories.splice(existedCategoryIndex, 1);

  res.status(204).send();
});

module.exports = router;
