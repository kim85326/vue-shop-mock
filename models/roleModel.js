const moment = require("moment");

moment.locale("zh-tw");

const roleModel = {
  roles: [
    {
      id: 1,
      name: "超級管理員",
      description: "超猛的",
      permissions: [
        "user-read",
        "user-add",
        "user-update",
        "user-delete",
        "role-read",
        "role-add",
        "role-update",
        "role-delete",
      ],
      createdTime: moment("2018-09-28T11:00:10").format(),
    },
    {
      id: 2,
      name: "商品管理員",
      description: "只能管商品蛤",
      permissions: ["user-read", "role-read", "role-add", "role-update", "role-delete"],
      createdTime: moment("2018-09-29T13:55:30").format(),
    },
    {
      id: 4,
      name: "訂單管理員",
      description: "最佳業務員",
      permissions: ["user-read", "role-read"],
      createdTime: moment("2018-09-29T13:55:30").format(),
    },
  ],
  lastId: 4,
  getById: function (id) {
    return this.roles.find((role) => role.id === id);
  },
};

module.exports = roleModel;
