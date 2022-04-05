'use strict';

module.exports = app => {
  const { INTEGER } = app.Sequelize;

  const SysRoleMenu = app.model.define('sys_role_menu', {
    role_id: INTEGER(11),
    menu_id: INTEGER(11),
  });

  return SysRoleMenu;
};
