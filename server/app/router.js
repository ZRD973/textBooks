'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, jwt } = app;

  router.post('/api/user/login', controller.sys.user.login);
  router.get('/api/user/info', jwt, controller.sys.user.getCurUserInfo);

  router.post('/api/change/psw', jwt, controller.sys.user.changePsw);
  router.post('/api/reset/psw', jwt, controller.sys.user.resetPsw);

  router.post('/api/file', controller.sys.file.upload);

  router.get('/api/user/page', jwt, controller.sys.user.page);
  router.post('/api/user/create', jwt, controller.sys.user.create);
  router.post('/api/user/update', jwt, controller.sys.user.update);
  router.post('/api/user/delete', jwt, controller.sys.user.delete);

  router.get('/api/role/query', jwt, controller.sys.role.query);
  router.get('/api/role/page', jwt, controller.sys.role.page);
  router.post('/api/role/create', jwt, controller.sys.role.create);
  router.post('/api/role/update', jwt, controller.sys.role.update);
  router.post('/api/role/delete', jwt, controller.sys.role.delete);

  // 查询所有菜单
  router.get('/api/menu/query/tree', jwt, controller.sys.menu.queryTree);
  // 添加菜单
  router.post('/api/menu/create', jwt, controller.sys.menu.create);
  // 修改菜单
  router.post('/api/menu/update', jwt, controller.sys.menu.update);
  // 删除菜单
  router.post('/api/menu/delete', jwt, controller.sys.menu.delete);
  // 更新角色菜单
  router.post('/api/role/menu/update', jwt, controller.sys.menu.setRoleMenu);
  // 根据角色id查询菜单
  router.get('/api/role/menu', jwt, controller.sys.menu.getRoleMenu);
  // 获取当前用户菜单
  router.get('/api/user/menu', jwt, controller.sys.menu.getCurUserMenu);
  // 通过角色获取对应的用户
  router.get('/api/users/by/role', jwt, controller.sys.user.getUsersByRole);
  
  
  router.post('/api/class', jwt, controller.education.class.operateClass);
  router.post('/api/course', jwt, controller.education.course.operateCourse);
  router.post('/api/teacher/course', jwt, controller.education.course.teacherOperateCourse);
  router.post('/api/teacher/course/class', jwt, controller.education.course.queryTeacherCourseClass);
  router.post('/api/teacher', jwt, controller.education.teacher.getTeacher);
  router.post('/api/record', jwt, controller.book.bookStore.operateRecord);
  router.post('/api/continue/record', jwt, controller.book.bookStore.continueRecord);
  router.post('/api/store', jwt, controller.book.bookStore.operateStore);
  router.post('/api/class/course', jwt, controller.education.course.getClassCourse);
  router.post('/api/course/book', jwt, controller.education.course.getCourseBook);
  router.post('/api/record/detail', jwt, controller.education.course.getRecordDetail);
  router.post('/api/analyse/apply', jwt, controller.book.bookStore.analyseApply);
  

};
