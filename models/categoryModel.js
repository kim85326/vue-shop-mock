const moment = require("moment");

moment.locale("zh-tw");

const categoryModel = {
  categories: [
    {
      id: 1,
      name: "服裝",
      parentId: null,
      level: 1,
      createdTime: moment("2018-09-29T13:55:30").format(),
    },
    {
      id: 2,
      name: "3C數位",
      parentId: null,
      level: 1,
      createdTime: moment("2018-10-12T01:02:03").format(),
    },
    {
      id: 4,
      name: "家電",
      parentId: null,
      level: 1,
      createdTime: moment("2018-10-12T10:33:31").format(),
    },
    {
      id: 5,
      name: "上衣",
      parentId: 1,
      level: 2,
      createdTime: moment("2018-10-12T10:33:31").format(),
    },
    {
      id: 23,
      name: "洋裝",
      parentId: 1,
      level: 2,
      createdTime: moment("2018-12-30T01:02:03").format(),
    },
    {
      id: 24,
      name: "冰箱",
      parentId: 4,
      level: 2,
      createdTime: moment("2018-12-30T03:33:30").format(),
    },
    {
      id: 27,
      name: "手機通訊",
      parentId: 2,
      level: 2,
      createdTime: moment("2018-12-31T01:02:03").format(),
    },
    {
      id: 28,
      name: "手機配件",
      parentId: 2,
      level: 2,
      createdTime: moment("2018-12-31T01:02:05").format(),
    },
    {
      id: 29,
      name: "攝影攝像",
      parentId: 2,
      level: 2,
      createdTime: moment("2018-12-31T01:02:29").format(),
    },
    {
      id: 30,
      name: "洗衣機",
      parentId: 4,
      level: 2,
      createdTime: moment("2019-01-02T01:02:03").format(),
    },
    {
      id: 36,
      name: "APPLE",
      parentId: 27,
      level: 3,
      createdTime: moment("2018-12-31T01:04:03").format(),
    },
  ],
  lastId: 39,
  getById: function (id) {
    return this.categories.find((category) => category.id === id);
  },
  getByName: function (name) {
    return this.categories.find((category) => category.name === name);
  },
};

module.exports = categoryModel;
