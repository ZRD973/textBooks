'use strict';
const base = require('../base');

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const SysRole = app.model.define('sys_role',
    Object.assign(base(app), {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      name: STRING(25),
      code: STRING(25),
      sort: INTEGER(11),
    }));

  SysRole.associate = () => {
    SysRole.belongsToMany(app.model.Sys.User, {
      through: app.model.Sys.UserRole,
      foreignKey: 'role_id',
      otherKey: 'user_id',
    });
  };
  SysRole.associate = () => {
    SysRole.belongsToMany(app.model.Sys.Menu, {
      through: app.model.Sys.RoleMenu,
      foreignKey: 'role_id',
      otherKey: 'menu_id',
    });
  };
  return SysRole;
};
