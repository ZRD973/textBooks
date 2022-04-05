'use strict';

const Controller = require('../base');

class SysUserController extends Controller {
  async login() {
    const { ctx } = this;
    const body = ctx.request.body;
    ctx.validate({
      username: { type: 'string', required: true },
      password: { type: 'string', required: true },
    }, body);

    const res = await ctx.service.sys.user.login(body);
    if (res) {
      this.success(res);
    } else {
      this.error('登录失败！');
    }
  }

  async getCurUserInfo() {
    const { ctx } = this;
    const res = await ctx.service.sys.user.getCurUserInfo();
    if (res) {
      this.success(res);
    } else {
      this.error('查询失败！');
    }
  }

  async changePsw() {
    const { ctx } = this;
    const body = ctx.request.body;
    ctx.validate({
      pass: { type: 'string', required: true },
      old_pass: { type: 'string', required: true },
    }, body);
    const res = await ctx.service.sys.user.changePsw(body);
    if (res.success) {
      this.success(res.msg);
    } else {
      this.error(res.msg);
    }
  }

  async resetPsw() {
    const { ctx } = this;
    const body = ctx.request.body;
    ctx.validate({
      id: { type: 'number', required: true },
    }, body);
    const res = await ctx.service.sys.user.resetPsw(body);
    if (res.success) {
      this.success(res.msg);
    } else {
      this.error(res.msg);
    }
  }

  async page() {
    const { ctx } = this;
    const query = ctx.query;
    ctx.validate({
      limit: { type: 'string', required: true },
      page: { type: 'string', required: true },
    }, query);

    this.success(await ctx.service.sys.user.page(query));
  }

  async create() {
    const { ctx } = this;
    const body = ctx.request.body;

    ctx.validate({
      username: { type: 'string', required: true },
      name: { type: 'string', required: true },
      roles: { type: 'array', required: true },
    }, body);

    const res = await ctx.service.sys.user.create(body);
    if (res.success) {
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

    const res = await ctx.service.sys.user.update(body);
    if (res.success) {
      this.success('修改成功');
    } else {
      this.error('修改失败 ' + (res.msg || ''));
    }
  }

  async delete() {
    const { ctx } = this;
    const body = ctx.request.body;

    ctx.validate({
      id: { type: 'integer', required: true },
    }, body);
    const success = await ctx.service.sys.user.delete(body);
    if (success) {
      this.success('删除成功');
    } else {
      this.error('删除失败');
    }
  }

  /**
   * 通过角色获取对应的用户
   */
  async getUsersByRole() {
    const { ctx } = this;
    const query = ctx.query;
    ctx.validate({
      role_code: { type: 'string', required: true },
    }, query);
    const res = await ctx.service.sys.user.getUsersByRole(query.role_code, query.name);
    if (res) {
      this.success(res);
    } else {
      this.error('查询失败！');
    }
  }
}

module.exports = SysUserController;
