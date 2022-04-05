'use strict';

const Controller = require('../base');

class SysMenuController extends Controller {
  async queryTree() {
    const { ctx } = this;
    const res = await ctx.service.sys.menu.queryTree();
    if (res) {
      this.success(res);
    } else {
      this.error('查询失败！');
    }
  }

  async create() {
    const { ctx } = this;
    const body = ctx.request.body;

    ctx.validate({
      parent_id: { type: 'integer', required: true },
      meta_title: { type: 'string', required: true },
      path: { type: 'string', required: true },
      component: { type: 'string', required: true },
      name: { type: 'string', required: true },
      meta_icon: { type: 'string', required: true },
    }, body);

    const res = await ctx.service.sys.menu.create(body);
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

    const res = await ctx.service.sys.menu.update(body);
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
    const res = await ctx.service.sys.menu.delete(body);
    if (res.success) {
      this.success('删除成功');
    } else {
      this.error('删除失败 ' + (res.msg || ''));
    }
  }

  async setRoleMenu() {
    const { ctx } = this;
    const body = ctx.request.body;
    ctx.validate({
      trees: { type: 'array', required: true },
      role_id: { type: 'integer', required: true },
    }, body);

    const res = await ctx.service.sys.menu.setRoleMenu(body);
    if (res.success) {
      this.success('修改成功');
    } else {
      this.error('修改失败！');
    }
  }

  async getRoleMenu() {
    const { ctx } = this;
    const query = ctx.query;
    ctx.validate({
      role_id: { type: 'string', required: true },
    }, query);

    const res = await ctx.service.sys.menu.getRoleMenu(query);
    if (res) {
      this.success(res);
    } else {
      this.error('查询失败！');
    }
  }

  async getCurUserMenu() {
    const { ctx } = this;
    const query = ctx.query;

    const res = await ctx.service.sys.menu.getCurUserMenu(query);
    if (res) {
      this.success(res);
    } else {
      this.error('查询失败！');
    }
  }
}

module.exports = SysMenuController;
