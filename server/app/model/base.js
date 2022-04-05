'use strict';
const moment = require('moment');

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  return {
    upt_act: { type: STRING(2), defaultValue: () => 'I' },
    created_id: INTEGER,
    created_at: {
      type: DATE,
      defaultValue: () => {
        return moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
      },
      get() {
        return moment(this.getDataValue('created_at')).format('YYYY-MM-DD HH:mm:ss');
      },
    },
    updated_id: INTEGER,
    updated_at: {
      type: DATE,
      defaultValue: () => {
        return moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
      },
      get() {
        return moment(this.getDataValue('updated_at')).format('YYYY-MM-DD HH:mm:ss');
      },
    },
  };
};
