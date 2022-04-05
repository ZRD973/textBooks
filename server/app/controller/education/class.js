'use strict';

const Controller = require('../base');

class ClassController extends Controller {
  async operateClass() {
    const { ctx } = this;
    let body = ctx.request.body;
    // ctx.validate({
    //   username: { type: 'string', required: true },
    //   password: { type: 'string', required: true },
    // }, body);

    const res = await ctx.service.education.class.operateClass(body);
    if (res) {
      this.success(res);
    } else {
      this.error('失败！');
    }
  }
}
module.exports = ClassController;