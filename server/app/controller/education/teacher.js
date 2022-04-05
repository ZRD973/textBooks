'use strict';

const Controller = require('../base');

class TeacherController extends Controller {
  async getTeacher() {
    const { ctx } = this;
    let params = ctx.request.body;

    const res = await ctx.service.education.teacher.getTeacher(params);
    if (res) {
      this.success(res);
    } else {
      this.error('失败！');
    }
  }
}
module.exports = TeacherController;