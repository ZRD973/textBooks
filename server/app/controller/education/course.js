'use strict';

const Controller = require('../base');

class CourseController extends Controller {

  async operateCourse() {
    const { ctx } = this;
    let params = ctx.request.body;

    const res = await ctx.service.education.course.operateCourse(params);
    if (res) {
      this.success(res);
    } else {
      this.error('失败！');
    }
  }

  async teacherOperateCourse() {
    const { ctx } = this;
    let params = ctx.request.body;

    const res = await ctx.service.education.course.teacherOperateCourse(params);
    if (res) {
      this.success(res);
    } else {
      this.error('失败！');
    }
  }

  async queryTeacherCourseClass() {
    const { ctx } = this;
    let params = ctx.request.body;

    const res = await ctx.service.education.course.queryTeacherCourseClass(params);
    if (res) {
      this.success(res);
    } else {
      this.error('失败！');
    }
  }
  async getClassCourse() {
    const { ctx } = this;
    let params = ctx.request.body;

    const res = await ctx.model.Education.Course.findAll({
      include:{
        model:ctx.model.Education.Class,
        where:{id:params.class_id}
      }
    });

    if (res) {
      this.success(res);
    } else {
      this.error('失败！');
    }
  }

  async getCourseBook() {
    const { ctx } = this;
    let params = ctx.request.body;

    const res = await ctx.model.Book.Store.findAll({
      where:{ course_id:params.course_id }
    });

    if (res) {
      this.success(res);
    } else {
      this.error('失败！');
    }
  }

  async getRecordDetail() {
    const { ctx } = this;
    let params = ctx.request.body;

    const res = await ctx.model.Book.BookStore.findAll({
      where:{ id:params.record_id }
    });

    if (res) {
      this.success(res);
    } else {
      this.error('失败！');
    }
  }




}
module.exports = CourseController;