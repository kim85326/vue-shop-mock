const express = require("express");
const router = express.Router();

const { sleep } = require("../classes/utils");
const { convertToCategoryTree, convertToCategoryContent } = require("../classes/converters");
const categoryModel = require("../models/categoryModel");

/**
 * 取得樹狀結構的分類列表
 * GET: /api/v1/categories/tree
 */
router.get("/tree", async function (req, res, next) {
  const categoryTree = convertToCategoryTree(categoryModel.categories);
  res.status(200).json(categoryTree);
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

  const categoryContents = convertToCategoryContent(existedCategory);

  res.status(200).json(categoryContents);
});

/**
 * 新增分類
 * POST: /api/v1/categories
 */
router.post("/", async function (req, res, next) {
  const { name, parentId } = req.body;
  // 驗證輸入

  let parentCategory;
  if (parentId) {
    parentCategory = categoryModel.categories.find((category) => category.id === Number(parentId));
    if (!parentCategory) {
      res.status(400).send();
      return;
    }

    if (parentCategory.level >= 3) {
      res.status(400).send();
      return;
    }
  }

  const now = new Date().toISOString();

  const category = {
    id: ++categoryModel.lastId,
    name,
    parentId: parentId ? parentId : null,
    level: parentId ? parentCategory.level + 1 : 1,
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
    return;
  }

  // 驗證輸入
  const name = req.body.name || existedCategory.name;
  // 目前系統限制只可以修改分類名稱
  // const parentId = req.body.parentId === undefined ? existedCategory.parentId : req.body.parentId;
  // const parentCategory = categoryModel.categories.find((category) => category.id === Number(parentId));
  // if (!parentCategory) {
  //   res.status(400).send();
  //   return;
  // }

  const category = {
    ...existedCategory,
    name,
    // parentId,
    // level: parentCategory.level + 1,
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
  const existedCategory = categoryModel.categories.find((category) => category.id === Number(req.params.id));
  if (!existedCategory) {
    res.status(404).send();
  }

  const children = categoryModel.categories.find((category) => category.parentId === existedCategory.id);
  const hasChildren = children !== undefined;

  if (hasChildren) {
    res.status(403).send();
  }

  const existedCategoryIndex = categoryModel.categories.findIndex((category) => category.id === Number(req.params.id));

  categoryModel.categories.splice(existedCategoryIndex, 1);

  res.status(204).send();
});

module.exports = router;
