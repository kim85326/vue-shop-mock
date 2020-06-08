const permissions = [
  {
    name: "user-read",
    description: "檢視用戶",
  },
  {
    name: "user-add",
    description: "新增用戶",
  },
  {
    name: "user-update",
    description: "編輯用戶",
  },
  {
    name: "user-delete",
    description: "刪除用戶",
  },
  {
    name: "role-read",
    description: "檢視角色",
  },
  {
    name: "role-add",
    description: "新增角色",
  },
  {
    name: "role-update",
    description: "編輯角色",
  },
  {
    name: "role-delete",
    description: "刪除角色",
  },
  {
    name: "category-read",
    description: "檢視分類",
  },
  {
    name: "category-add",
    description: "新增分類",
  },
  {
    name: "category-update",
    description: "編輯分類",
  },
  {
    name: "category-delete",
    description: "刪除分類",
  },
];

const getPermissionByName = (name) => {
  return permissions.find((permission) => permission.name === name);
};

module.exports = { permissions, getPermissionByName };
