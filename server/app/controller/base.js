'use strict';

const { Controller } = require('egg');
class BaseController extends Controller {
  success(data) {
    this.ctx.body = {
      code: 200,
      success: true,
      data,
    };
  }

  error(data) {
    this.ctx.body = {
      code: 200,
      success: false,
      data,
    };
  }
}
module.exports = BaseController;
