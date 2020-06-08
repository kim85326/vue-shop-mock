const moment = require("moment");

moment.locale("zh-tw");

const categoryModel = {
  categories: [
    {
      id: 1,
      name: "服裝",
      createdTime: moment("2018-09-29T13:55:30").format(),
    },
    {
      id: 2,
      name: "手機",
      createdTime: moment("2018-10-12T01:02:03").format(),
    },
    {
      id: 4,
      name: "家電",
      createdTime: moment("2018-10-12T10:33:31").format(),
    },
    {
      id: 23,
      name: "傢俱",
      createdTime: moment("2018-12-29T14:11:02").format(),
    },
  ],
  lastId: 23,
  getById: function (id) {
    return this.categories.find((category) => category.id === id);
  },
  getByName: function (name) {
    return this.categories.find((category) => category.name === name);
  },
};

module.exports = categoryModel;
