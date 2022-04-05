"use strict";
const Service = require("egg").Service;
const { Op } = require("sequelize");
class SysUserService extends Service {
  async operateCourse(params) {
    const { ctx } = this;
    if (params.flag == 1) {
      const { course } = params.data;
      try {
        const res = await ctx.model.Education.Course.findAll();
        let isSame = false;
        res.forEach((item) => {
          if (item.course == course) {
            isSame = true;
          }
        });
        if (isSame) {
          return { msg: "已有该班级，不可添加", same: true };
        } else {
          const res = await ctx.model.Education.Course.create(params.data);
          return res;
        }
      } catch (error) {
        console.log(error);
        return null;
      }
    } else if (params.flag == 2) {
      try {
        const res = await ctx.model.Education.Course.destroy({
          where: { id: params.data },
        });
        return res;
      } catch (error) {
        console.log(error);
        return null;
      }
    } else if (params.flag == 3) {
      try {
        const res = await ctx.model.Education.Course.update(params.data, {
          where: { id: params.data.id },
        });
        return res;
      } catch (error) {
        console.log(error);
        return null;
      }
    } else {
      let limit = params.limit;
      let page = params.page;
      if (!limit) {
        limit = 8;
      }
      if (!page) {
        page = 1;
      }
      let where = {};
      if (params.course) {
        where.course = { [Op.like]: `%${params.course}%` };
      }
      try {
        const res = await ctx.model.Education.Course.findAndCountAll({
          offset: (page - 1) * limit,
          limit: parseInt(limit),
          where,
        });
        return res;
      } catch (error) {
        console.log(error);
        return null;
      }
    }
  }

  async teacherOperateCourse(params) {
    const { ctx } = this;
    if (params.flag == 1) {
      const { teacher_id, class_id, course_id } = params.data;
      try {
        const res = await ctx.model.Education.TeacherCourseClass.findAll({
          where: { teacher_id },
        });
        let isSame = false;
        res.forEach((item) => {
          if (item.class_id == class_id && item.course_id == course_id) {
            isSame = true;
          }
        });
        if (isSame) {
          return { msg: "已有该课程，不可添加", same: true };
        } else {
          const res = await ctx.model.Education.TeacherCourseClass.create(
            params.data
          );
          return res;
        }
      } catch (error) {
        console.log(error);
        return null;
      }
    } else if (params.flag == 2) {
      try {
        const res = await ctx.model.Education.TeacherCourseClass.destroy({
          where: params.data,
        });
        return res;
      } catch (error) {
        console.log(error);
        return null;
      }
    } else {
      let limit = params.limit;
      let page = params.page;
      if (!limit) {
        limit = 8;
      }
      if (!page) {
        page = 1;
      }
      let where ={};
      if (params.course) {
        where.course = { [Op.like]: `%${params.course}%` };
      }
      try {
        const res = await ctx.model.Education.Course.findAndCountAll({
          offset: (page - 1) * limit,
          limit: parseInt(limit),
          where
        });
        return res;
      } catch (error) {
        console.log(error);
        return null;
      }
    }
  }

  async queryTeacherCourseClass(params) {
    const { ctx } = this;
    const { userid } = ctx.state.user;
    const {teacher_id,course_id} = params;
    let t_id;
    if(teacher_id){ t_id = teacher_id } else { t_id = userid}
    let querySql = `SELECT * FROM sys_user as u 
    JOIN teacher_course_class as tcc ON tcc.teacher_id = u.id
    JOIN class as c ON c.id = tcc.class_id
    JOIN course as co ON co.id = tcc.course_id WHERE u.id = ${t_id}`
    let andCourseSql = ` AND co.id = ${course_id}`;
    if(course_id){
      querySql = querySql + andCourseSql
    }
    try {
      const [results, metadata] = await this.app.model.query(querySql) ;
      return results;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

}
module.exports = SysUserService;
