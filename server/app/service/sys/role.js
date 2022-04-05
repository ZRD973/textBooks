'use strict';

const Service = require('egg').Service;

class SysRoleService extends Service {
  async query() {
    const { app, ctx } = this;
    const Op = app.Sequelize.Op;
    try {
      return await ctx.model.Sys.Role.findAll({
        where: {
          upt_act: { [Op.ne]: 'D' },
        },
        order: [[ 'sort' ]],
      });
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async page(query) {
    const { app, ctx } = this;
    const { limit, page } = query;
    const Op = app.Sequelize.Op;
    const where = { upt_act: { [Op.ne]: 'D' } };
    if (query.name) {
      where.name = { [Op.like]: `%${query.name}%` };
    }
    try {
      return await ctx.model.Sys.Role.findAndCountAll({
        where,
        offset: (page - 1) * limit,
        limit: parseInt(limit),
        order: [[ 'sort' ], [ 'created_at', 'desc' ]],
      });
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async create(body) {
    const { ctx } = this;

    const { userid } = ctx.state.user;
    body.created_id = userid;
    body.updated_id = userid;
    try {
      return await ctx.model.Sys.Role.create(body);
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async update(body) {
    const { ctx } = this;
    const { userid } = ctx.state.user;
    body.updated_at = ctx.helper.formatTime(new Date());
    body.updated_id = userid;
    body.upt_act = 'U';

    try {
      return await ctx.model.Sys.Role.update(body, {
        where: {
          id: body.id,
        },
      });
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async delete({ id }) {
    const { app, ctx } = this;
    const body = {
      upt_act: 'D',
      updated_at: ctx.helper.formatTime(new Date()),
      updated_id: ctx.state.user.userid,
    };
    try {
      const Op = app.Sequelize.Op;
      const exit = await ctx.model.Sys.User.findOne({
        include: {
          model: ctx.model.Sys.Role,
          where: { id },
        },
        where: { upt_act: { [Op.ne]: 'D' } },
      });
      if (exit) {
        return { success: false, msg: '已经有用户绑定该角色!' };
      }
      await ctx.model.Sys.Role.update(body, {
        where: { id },
      });
      return { success: true };
    } catch (error) {
      console.log(error);
      return { success: false };
    }
  }
}

module.exports = SysRoleService;
