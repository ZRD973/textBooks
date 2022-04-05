'use strict';
const base = require('../base');

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const SysUser = app.model.define('sys_user',
    Object.assign(base(app), {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      username: STRING(64),
      name: STRING(32),
      password: STRING(255),
      sex: STRING(2),
      phone: STRING(32),
      native_place: STRING(32),
      birth: DATE
    }));

  SysUser.associate = () => {
    SysUser.belongsToMany(app.model.Sys.Role, {
      through: app.model.Sys.UserRole,
      foreignKey: 'user_id',
      otherKey: 'role_id',
    });
    SysUser.belongsToMany(app.model.Education.Course, {
      through: app.model.Education.TeacherCourseClass,
      foreignKey: 'teacher_id',
      otherKey: 'course_id',
    });
    SysUser.belongsToMany(app.model.Education.Class, {
      through: app.model.Education.TeacherCourseClass,
      foreignKey: 'teacher_id',
      otherKey: 'class_id',
    });

    // SysUser.hasMany(app.model.Class.Class, { foreignKey: 'head_id', targetKey: 'id' });
    // SysUser.hasMany(app.model.Class.Class, { foreignKey: 'teacher_id', targetKey: 'id' });
  };

  return SysUser;
};
