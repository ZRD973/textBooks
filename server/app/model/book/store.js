'use strict';
const base = require('../base');

module.exports = app => {
  const { STRING, INTEGER, DATE, DECIMAL } = app.Sequelize;

  const Store = app.model.define('store',{
      s_id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      book: STRING(20),
      editor: STRING(20),
      pubDate: DATE,
      ISBN: STRING(30),
      publisher: STRING(20),
      book_type: STRING(20),
      book_usage: STRING(20),
      price:DECIMAL,
      book_total:INTEGER,
      record_id:INTEGER,
      course_id:INTEGER,
      created_at: DATE,
      updated_at: DATE
    });

  return Store;
};
