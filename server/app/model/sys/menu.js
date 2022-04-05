'use strict';
const base = require('../base');

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const SysMenu = app.model.define('sys_menu',
    Object.assign(base(app), {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      path: STRING(64),
      component: STRING(64),
      name: STRING(64),
      meta_title: STRING(32),
      meta_icon: STRING(32),
      sort: INTEGER(11),
      parent_id: INTEGER(11),
      hidden: STRING(2),
      keep_alive:{ type: STRING(2), defaultValue: () => '0' },
    }));
  SysMenu.associate = () => {
    SysMenu.belongsToMany(app.model.Sys.Role, {
      through: app.model.Sys.RoleMenu,
      foreignKey: 'menu_id',
      otherKey: 'role_id',
    });
  };
  return SysMenu;
};
