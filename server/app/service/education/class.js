"use strict";
const Service = require("egg").Service;
const { Op } = require("sequelize");
class SysUserService extends Service {
  async operateClass(body) {
    const { ctx } = this;
    if(body.flag == 1){
      const {college,grade_major_class} = body.data;
      try {
        const data = await ctx.model.Education.Class.findAll();
        let isExist = false;
        data.forEach(item => {
          if(item.college == college && item.grade_major_class == grade_major_class){
            isExist = true;
          }
        });
        if(isExist){
          return {msg:'已有该班级，不可添加',same:true}
        }else{
          const res = await ctx.model.Education.Class.create(body.data);
          return res;
        }
      } catch (error) {
        console.log(error);
        return null;
      }
    }
    else if(body.flag == 2){
      try {
        const res = await ctx.model.Education.Class.destroy({where:{id:body.data}});
        return res;
      } catch (error) {
        console.log(error);
        return null;
      }
    }
    else if(body.flag == 3){
      const {college,grade_major_class,nums,direction} = body.data;
      try {
        const data = await ctx.model.Education.Class.findAll();
        const self = await ctx.model.Education.Class.findOne({where:{id:body.data.id}});
        let isExist = false;
        if(self.nums == nums && self.direction == direction){
          data.forEach(item => {
            if(item.college == college && item.grade_major_class == grade_major_class){
              isExist = true;
            }
          });
        }
        if(isExist){
          return {msg:'修改有误，可能已存在该班级',same:true}
        }else{
          const res = await ctx.model.Education.Class.update(body.data,{
            where:{id:body.data.id}
          });
          return res;
        }
      } catch (error) {
        console.log(error);
        return null;
      }

    }
    
    else{
      let limit = body.limit;
      let page = body.page;
      let where = {};
      if(!limit){ limit = 8 };
      if(!page) { page = 1 };
      if(body.college){ where.college = { [Op.like]: `%${body.college}%` }; }
      if(body.class){ where.grade_major_class = { [Op.like]: `%${body.class}%` }; }
      try {
        const res = await ctx.model.Education.Class.findAndCountAll({
          offset: (page - 1) * limit,
          limit: parseInt(limit),
          where,
          order: [ 'college' ],
        });
        return res;
      } catch (error) {
        console.log(error);
        return null;
      }
    }
  }
}
module.exports = SysUserService;
