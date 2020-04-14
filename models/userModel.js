const userModel = {
  users: [
    {
      id: 1,
      roleId: 1,
      username: "hello123",
      password: "a123456789",
      name: "李正赫",
      email: "hello123@gmail.com",
      isEnabled: true,
      remark: "朝鮮人民軍總政治局局長的小兒子，現任民警大隊第五中隊大尉中隊長",
      createdTime: "2018-09-29T13:55:30",
      latestLoginTime: "2018-09-29T13:55:39",
    },
    {
      id: 2,
      roleId: 1,
      username: "elaine123",
      password: "elaine123",
      name: "尹世理",
      email: "elaine@gmail.com",
      isEnabled: true,
      remark: "韓國女王集團會長的小女兒",
      createdTime: "2019-10-06T15:02:51",
      latestLoginTime: "2019-10-06T15:53:51",
    },
    {
      id: 3,
      roleId: 2,
      username: "hi123",
      password: "hi123",
      name: "徐丹",
      email: "h123@gmail.com",
      isEnabled: false,
      remark: "",
      createdTime: "2018-09-29T13:55:30",
      latestLoginTime: null,
    },
    {
      id: 50,
      roleId: 4,
      username: "ssssssskkkkkkkkk123",
      password: "ssssssskkkkkkkkk123",
      name: "阿爾貝托",
      email: "dddddeeeeeeeeeegggggg123@gmail.com",
      isEnabled: true,
      remark: "英籍企業家，打算與世理結婚",
      createdTime: "2019-04-20T12:45:16",
      latestLoginTime: null,
    },
  ],
  lastId: 50,
  getById: function (id) {
    return this.users.find((user) => user.id === id);
  },
  getByUsername: function (username) {
    return this.users.find((user) => user.username === username);
  },
};

module.exports = userModel;
