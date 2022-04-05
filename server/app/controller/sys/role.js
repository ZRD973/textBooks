'use strict';

const Controller = require('../base');

class SysRoleController extends Controller {
  async query() {
    const { ctx } = this;
    this.success(await ctx.service.sys.role.query());
  }

  async page() {
    const { ctx } = this;
    const query = ctx.query;
    ctx.validate({
      limit: { type: 'string', required: true },
      page: { type: 'string', required: true },
    }, query);

    this.success(await ctx.service.sys.role.page(query));
  }

  async create() {
    const { ctx } = this;
    const body = ctx.request.body;

    ctx.validate({
      name: { type: 'string', required: true },
    }, body);

    const res = await ctx.service.sys.role.create(body);
    if (res) {
      this.success('添加成功');
    } else {
      this.error('添加失败 ' + (res.msg || ''));
    }
  }

  async update() {
    const { ctx } = this;
    const body = ctx.request.body;

    ctx.validate({
      id: { type: 'integer', required: true },
    }, body);

    const res = await ctx.service.sys.role.update(body);
    if (res) {
      this.success('修改成功');
    } else {
      this.error('修改失败');
    }
  }

  async delete() {
    const { ctx } = this;
    const body = ctx.request.body;

    ctx.validate({
      id: { type: 'integer', required: true },
    }, body);
    const res = await ctx.service.sys.role.delete(body);
    if (res.success) {
      this.success('删除成功');
    } else {
      this.error('删除失败 ' + (res.msg || ''));
    }
  }
}

module.exports = SysRoleController;
