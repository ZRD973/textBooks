'use strict';
const base = require('../base');

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const Class = app.model.define('class', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      college: STRING(20),
      grade_major_class: STRING(20),
      nums: STRING(100),
      direction: STRING(20),
    });

    Class.associate = () => {
      Class.belongsToMany(app.model.Sys.User, {
          through: app.model.Education.TeacherCourseClass,
          foreignKey: 'class_id',
          otherKey: 'teacher_id',
      });
      Class.belongsToMany(app.model.Education.Course, {
          through: app.model.Education.TeacherCourseClass,
          foreignKey: 'class_id',
          otherKey: 'course_id',
      });
    }

  return Class;
};
