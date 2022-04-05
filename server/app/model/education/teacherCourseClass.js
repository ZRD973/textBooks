'use strict';
const base = require('../base');

module.exports = app => {
  const { INTEGER } = app.Sequelize;

  const TeacherCourseClass = app.model.define('teacher_course_class', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      teacher_id: INTEGER,
      course_id: INTEGER,
      class_id: INTEGER,
    });

  return TeacherCourseClass;
};
