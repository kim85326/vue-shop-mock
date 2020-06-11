const roleModel = require("../models/roleModel");

const convertToUserContent = ({
  id,
  roleId,
  username,
  name,
  email,
  isEnabled,
  remark,
  createdTime,
  latestLoginTime,
}) => ({
  id,
  role: convertToRoleContent(roleModel.getById(roleId)),
  username,
  name,
  email,
  isEnabled,
  remark,
  createdTime,
  latestLoginTime,
});

const convertToRoleSummaryContent = ({ id, name }) => ({
  id,
  name,
});

const convertToRoleContent = ({ id, name, description, permissions, createdTime }) => ({
  id,
  name,
  permissions,
  description,
  createdTime,
});

const convertToCategoryContent = ({ id, name, level, parentId, createdTime }) => ({
  id,
  name,
  level,
  parentId,
  createdTime,
});

const convertToCategoryTree = (categories, pid = null) => {
  const children = categories.filter((category) => category.parentId === pid);
  if (children.length === 0) {
    return [];
  }

  return children.map((category) => ({
    id: category.id,
    name: category.name,
    level: category.level,
    parentIds: category.parentId,
    children: convertToCategoryTree(categories, category.id),
    createdTime: category.createdTime,
  }));
};

module.exports = {
  convertToUserContent,
  convertToRoleSummaryContent,
  convertToRoleContent,
  convertToCategoryContent,
  convertToCategoryTree,
};
