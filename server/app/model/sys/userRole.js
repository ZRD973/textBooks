'use strict';

module.exports = app => {
  const { INTEGER } = app.Sequelize;

  const SysUserRole = app.model.define('sys_user_role', {
    user_id: INTEGER(11),
    role_id: INTEGER(11),
  });

  return SysUserRole;
};
