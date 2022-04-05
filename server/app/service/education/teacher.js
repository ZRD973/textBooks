"use strict";
const Service = require("egg").Service;
const { Op } = require("sequelize");
class TeacherService extends Service {
  async getTeacher(data) {
    const { ctx } = this;
    let limit = data.limit
    let page = data.page
    if(!limit){ limit = 8;}
    if(!page) { page = 1;}
    let where = {};
    if(data.username){ where.username = { [Op.like]: `%${data.username}%` }; }
    if(data.name){ where.name = { [Op.like]: `%${data.name}%` }; }
    try {
      const res = await ctx.model.Sys.User.findAndCountAll({
        offset: (page - 1) * limit,
        limit: parseInt(limit),
        where,
        include:{
          model:ctx.model.Sys.Role,
          attributes:['code','name'],
          where:{code:'teacher'}
        }
      });
      return res;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
module.exports = TeacherService;
