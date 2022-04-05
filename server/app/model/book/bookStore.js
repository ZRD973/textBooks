'use strict';
const base = require('../base');

module.exports = app => {
  const { STRING, INTEGER, DATE, DECIMAL } = app.Sequelize;

  const Record = app.model.define('record',{
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      teacher: STRING(20),
      course: STRING(20),
      class: STRING(20),
      direction: STRING(20),
      sdt_book_nums: INTEGER,
      standby_nums: INTEGER,
      tch_book_nums: INTEGER,
      price: DECIMAL,
      total: DECIMAL,
      book: STRING(20),
      editor: STRING(20),
      pubDate: DATE,
      ISBN: STRING(30),
      publisher: STRING(20),
      book_type: STRING(20),
      book_usage: STRING(20),
      apply: STRING(10),
      book_total:INTEGER,
      course_id:INTEGER,
      store_id:INTEGER,
      created_id: INTEGER,
      created_at: DATE,
      updated_at: DATE
    });

  return Record;
};
