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

module.exports = { convertToUserContent, convertToRoleSummaryContent, convertToRoleContent };
