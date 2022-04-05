'use strict';
const base = require('../base');

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const Course = app.model.define('course', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      course: STRING(20),
    });

    Course.associate = () => {
      Course.belongsToMany(app.model.Sys.User, {
          through: app.model.Education.TeacherCourseClass,
          foreignKey: 'course_id',
          otherKey: 'teacher_id',
      });
      Course.belongsToMany(app.model.Education.Class, {
        through: app.model.Education.TeacherCourseClass,
        foreignKey: 'course_id',
        otherKey: 'class_id',
    });
      // Course.belongsToMany(app.model.Education.Class, {
      //     through: app.model.Education.TeacherCourseClass,
      //     foreignKey: 'course_id',
      //     otherKey: 'class_id',
      // });
    }

  return Course;
};
