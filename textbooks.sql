/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 80024
 Source Host           : localhost:3306
 Source Schema         : textbooks

 Target Server Type    : MySQL
 Target Server Version : 80024
 File Encoding         : 65001

 Date: 05/04/2022 02:06:48
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for class
-- ----------------------------
DROP TABLE IF EXISTS `class`;
CREATE TABLE `class`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `college` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '学院',
  `grade_major_class` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '年级专业班级',
  `nums` int(0) NULL DEFAULT NULL COMMENT '班级人数',
  `direction` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '方向',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 14 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of class
-- ----------------------------
INSERT INTO `class` VALUES (1, '人工智能学院', '18软工1班', 60, '软件');
INSERT INTO `class` VALUES (2, '人工智能学院', '18大数据1班', 50, '大数据');
INSERT INTO `class` VALUES (3, '人工智能学院', '18电信1班', 55, '电子');
INSERT INTO `class` VALUES (4, '设计学院', '18数媒1班', 45, '游戏');
INSERT INTO `class` VALUES (5, '人工智能学院', '18计科1班', 65, '硬件');
INSERT INTO `class` VALUES (6, '人工智能学院', '19软工1班', 35, '软件');
INSERT INTO `class` VALUES (7, '人工智能学院', '19软工2班', 67, '硬件');
INSERT INTO `class` VALUES (8, '人工智能学院', '19大数据1班', 30, '大数据');
INSERT INTO `class` VALUES (9, '人工智能学院', '19大数据2班', 35, '大数据');
INSERT INTO `class` VALUES (10, '商学院', '18工商管理1班', 60, NULL);
INSERT INTO `class` VALUES (11, '商学院', '18金融管理1班', 50, NULL);

-- ----------------------------
-- Table structure for course
-- ----------------------------
DROP TABLE IF EXISTS `course`;
CREATE TABLE `course`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `course` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of course
-- ----------------------------
INSERT INTO `course` VALUES (1, '大数据导论');
INSERT INTO `course` VALUES (2, '软件工程');
INSERT INTO `course` VALUES (3, '计算机操作系统');
INSERT INTO `course` VALUES (4, '高级程序设计');
INSERT INTO `course` VALUES (5, 'php应用设计');
INSERT INTO `course` VALUES (6, '游戏开发设计');
INSERT INTO `course` VALUES (7, 'web程序设计');
INSERT INTO `course` VALUES (8, '数据库管理设计');
INSERT INTO `course` VALUES (9, '软件测试');

-- ----------------------------
-- Table structure for record
-- ----------------------------
DROP TABLE IF EXISTS `record`;
CREATE TABLE `record`  (
  `id` int(0) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `teacher` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '教师姓名',
  `course` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '课程名',
  `class` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '班级',
  `direction` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '方向',
  `sdt_book_nums` int(0) NULL DEFAULT NULL COMMENT '学生用书',
  `standby_nums` int(0) NULL DEFAULT NULL COMMENT '学生备用书',
  `tch_book_nums` int(0) NULL DEFAULT NULL COMMENT '教师用书',
  `price` decimal(10, 2) NULL DEFAULT NULL COMMENT '单价',
  `total` decimal(10, 2) NULL DEFAULT NULL COMMENT '总价',
  `book` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '教材名字',
  `editor` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '主编',
  `pubDate` datetime(0) NULL DEFAULT NULL COMMENT '发布时间',
  `ISBN` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '书号',
  `publisher` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '出版社',
  `book_type` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '教材类型',
  `book_usage` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '教材选用情况',
  `apply` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '1:申请中；2：拒绝；3：通过；',
  `book_total` int(0) NULL DEFAULT NULL COMMENT '教材总量',
  `course_id` int(0) NULL DEFAULT NULL COMMENT '课程id',
  `store_id` int(0) NULL DEFAULT NULL COMMENT '仓库教材id',
  `created_id` int(0) NULL DEFAULT NULL COMMENT '创建者id，即教师id',
  `created_at` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `updated_at` datetime(0) NULL DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of record
-- ----------------------------
INSERT INTO `record` VALUES (6, '王五', '游戏开发设计', '18计科1班', '硬件', 65, 2, 1, 5.00, 340.00, '游戏开发设计与实现', '张三', '2022-03-31 00:00:00', '123456789', '阳光出版社', '马工', '选用', '3', 68, 6, 8, 54, '2022-04-03 14:06:34', '2022-04-03 14:32:56');
INSERT INTO `record` VALUES (7, '王五', 'web程序设计', '19软工1班,19软工2班', '硬件', 102, 2, 1, 2.00, 210.00, '网页设计与实现', '李四', '2022-03-31 00:00:00', '123123123', '阳光出版社', '马工', '选用', '1', 105, 7, NULL, 54, '2022-04-03 15:07:13', '2022-04-03 15:07:13');
INSERT INTO `record` VALUES (8, 'teacher', '大数据导论', '18大数据1班,19大数据2班', '大数据', 85, 2, 1, 12.00, 1056.00, '大数据导论设计与实现', '老六', '2022-03-30 00:00:00', '123456456', '北京大学出版社', '马工', '选用', '3', 88, 1, 10, 52, '2022-04-03 15:15:14', '2022-04-03 22:39:57');
INSERT INTO `record` VALUES (9, 'teacher', '软件工程', '18软工1班', '软件', 60, 2, 1, 2.00, 126.00, '软件项目设计', '小六', '2022-03-16 00:00:00', '456456456', '清华大学出版社', '马工', '选用', '1', 63, 2, NULL, 52, '2022-04-03 16:01:10', '2022-04-03 16:01:10');
INSERT INTO `record` VALUES (11, 'teacher', '计算机操作系统', '18大数据1班', '大数据', 50, 2, 1, 15.00, 795.00, '计算机基础', '小九', '2022-03-31 00:00:00', '111222333444', '阳光出版社', '马工', '选用', '3', 53, 3, 11, 52, '2022-04-04 02:01:53', '2022-04-04 02:01:58');
INSERT INTO `record` VALUES (12, '王五', '游戏开发设计', '18计科1班', '硬件', 65, 2, 1, 5.00, 340.00, '游戏开发设计与实现', '张三', '2022-03-31 00:00:00', '123456789', '阳光出版社', '马工', '选用', '4', 2, 6, 8, 52, '2022-04-04 02:36:03', '2022-04-04 02:36:03');
INSERT INTO `record` VALUES (14, '王五', '游戏开发设计', '18计科1班', '硬件', 10, 0, 0, 5.00, 50.00, '游戏开发设计与实现', '张三', '2022-03-31 00:00:00', '123456789', '阳光出版社', '马工', '选用', '3', 10, 6, 8, 52, '2022-04-04 20:43:39', '2022-04-04 21:07:14');
INSERT INTO `record` VALUES (15, '王五', '游戏开发设计', '18计科1班', '硬件', 10, 0, 0, 5.00, 50.00, '游戏开发设计与实现', '张三', '2022-03-31 00:00:00', '123456789', '阳光出版社', '马工', '选用', '3', 10, 6, 8, 52, '2022-04-04 21:12:10', '2022-04-04 21:12:33');
INSERT INTO `record` VALUES (16, '王五', '游戏开发设计', '18计科1班', '硬件', 10, 2, 0, 5.00, 340.00, '游戏开发设计与实现', '张三', '2022-03-31 00:00:00', '123456789', '阳光出版社', '马工', '选用', '4', 12, 6, 8, 52, '2022-04-04 21:14:10', '2022-04-04 21:14:10');
INSERT INTO `record` VALUES (17, 'teacher', '大数据导论', '18大数据1班,19大数据2班', '大数据', 85, 2, 1, 12.00, 1056.00, '大数据导论设计与实现', '老六', '2022-03-30 00:00:00', '123456456', '北京大学出版社', '马工', '选用', '4', 2, 1, 10, 52, '2022-04-05 01:21:25', '2022-04-05 01:21:25');

-- ----------------------------
-- Table structure for store
-- ----------------------------
DROP TABLE IF EXISTS `store`;
CREATE TABLE `store`  (
  `s_id` int(0) NOT NULL AUTO_INCREMENT COMMENT '仓库id',
  `book` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '教材名字',
  `editor` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '主编',
  `pubDate` datetime(0) NULL DEFAULT NULL COMMENT '发布时间',
  `ISBN` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '书号',
  `publisher` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '出版社',
  `book_type` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '教材类型',
  `book_usage` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '教材选用情况',
  `price` decimal(10, 2) NULL DEFAULT NULL COMMENT '单价',
  `book_total` int(0) NULL DEFAULT NULL COMMENT '教材总量',
  `record_id` int(0) NULL DEFAULT NULL COMMENT '记录id',
  `course_id` int(0) NULL DEFAULT NULL COMMENT '课程id',
  `created_at` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `updated_at` datetime(0) NULL DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`s_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of store
-- ----------------------------
INSERT INTO `store` VALUES (8, '游戏开发设计与实现', '张三', '2022-03-31 00:00:00', '123456789', '阳光出版社', '马工', '选用', 5.00, 12, 6, 6, '2022-04-03 14:06:34', '2022-04-04 21:12:33');
INSERT INTO `store` VALUES (10, '大数据导论设计与实现', '老六', '2022-03-30 00:00:00', '123456456', '北京大学出版社', '马工', '选用', 12.00, 2, 8, 1, '2022-04-03 15:15:14', '2022-04-03 22:37:19');
INSERT INTO `store` VALUES (11, '计算机基础', '小九', '2022-03-31 00:00:00', '111222333444', '阳光出版社', '马工', '选用', 15.00, 53, 11, 3, '2022-04-04 02:01:53', '2022-04-04 02:01:53');

-- ----------------------------
-- Table structure for sys_menu
-- ----------------------------
DROP TABLE IF EXISTS `sys_menu`;
CREATE TABLE `sys_menu`  (
  `id` int(0) NOT NULL AUTO_INCREMENT COMMENT '物理主键',
  `path` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '路径',
  `component` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '组件路径',
  `name` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '组件标识',
  `meta_title` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '菜单标题',
  `meta_icon` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '菜单图标',
  `sort` int(0) NULL DEFAULT NULL COMMENT '排序',
  `parent_id` int(0) NULL DEFAULT NULL COMMENT '父菜单ID',
  `hidden` varchar(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '(0显示，1隐藏)',
  `keep_alive` varchar(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '(0不缓存，1缓存)',
  `upt_act` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '数据状态（I插入 D删除 U更新）',
  `created_id` int(0) NULL DEFAULT NULL COMMENT '创建人ID',
  `created_at` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `updated_id` int(0) NULL DEFAULT NULL COMMENT '更新人ID',
  `updated_at` datetime(0) NULL DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 77 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '系统菜单表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_menu
-- ----------------------------
INSERT INTO `sys_menu` VALUES (1, '/sys', 'Layout', 'sys', '系统管理', 'set', 2, 0, '0', '0', 'I', NULL, NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (2, '/sys/user', 'sys/User', 'User', '用户管理', 'user', 3, 1, '0', '1', 'U', NULL, NULL, 36, '2021-04-01 10:38:52');
INSERT INTO `sys_menu` VALUES (3, '/sys/role', 'sys/Role', 'Role', '角色管理', 'role', 4, 1, '0', '1', 'I', NULL, NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (4, '/sys/menu', 'sys/Menu', 'Menu', '菜单管理', 'menu', 5, 1, '0', '1', 'I', NULL, NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (5, '/', 'Layout', 'home', '首页', 'home', 0, 0, '0', '0', 'I', NULL, NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (6, '/', 'index/Index', 'Home', '首页', 'home', 1, 5, '0', '0', 'I', NULL, NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (52, '/book', 'Layout', 'book', '教材仓库', 'course', 9, 0, '0', '0', 'U', 36, '2021-04-25 19:45:54', 36, '2022-03-31 20:38:12');
INSERT INTO `sys_menu` VALUES (54, '/book/store', 'book/Store', 'store', '教材数据', 'class', 9, 52, '0', '0', 'U', 36, '2021-04-25 20:01:12', 36, '2022-03-31 20:49:31');
INSERT INTO `sys_menu` VALUES (60, '/book/subscription', 'book/Subscription', 'subscription', '教材征订', 'student-m', 9, 52, '0', '0', 'U', 36, '2021-04-25 20:34:54', 36, '2022-03-31 20:48:13');
INSERT INTO `sys_menu` VALUES (62, '/book/record', 'book/Record', 'record', '出入库记录', 'record', 9, 52, '0', '0', 'U', 36, '2021-04-25 20:54:02', 36, '2022-03-31 20:42:16');
INSERT INTO `sys_menu` VALUES (70, '/receive', 'Layout', 'receive', '领书管理', 'record', 9, 0, '0', '0', 'U', 36, '2022-03-31 20:46:55', 36, '2022-03-31 20:51:48');
INSERT INTO `sys_menu` VALUES (71, '/receive/books', 'receive/Books', 'books', '领书操作', 'timetable', 9, 70, '0', '0', 'U', 36, '2022-03-31 20:48:00', 36, '2022-03-31 20:56:27');
INSERT INTO `sys_menu` VALUES (72, '/receive/analyse', 'receive/Analyse', 'analyse', '领书分析', 'class', 9, 70, '0', '0', 'I', 36, '2022-03-31 20:55:11', 36, '2022-03-31 20:55:11');
INSERT INTO `sys_menu` VALUES (73, '/educational', 'Layout', 'educational', '教务管理', 'course', 9, 0, '0', '0', 'I', 36, '2022-03-31 20:58:16', 36, '2022-03-31 20:58:16');
INSERT INTO `sys_menu` VALUES (74, '/educational/class', 'educational/Class', 'class', '班级管理', 'class', 9, 73, '0', '0', 'U', 36, '2022-03-31 20:58:57', 36, '2022-03-31 20:59:09');
INSERT INTO `sys_menu` VALUES (75, '/educational/course', 'educational/Course', 'course', '课程信息', 'menu', 9, 73, '0', '0', 'I', 36, '2022-03-31 20:59:51', 36, '2022-03-31 20:59:51');
INSERT INTO `sys_menu` VALUES (76, '/educational/teacher', 'educational/Teacher', 'teacher', '教师信息', 'user', 9, 73, '0', '0', 'U', 1, '2022-04-01 19:44:14', 1, '2022-04-01 19:47:59');

-- ----------------------------
-- Table structure for sys_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_role`;
CREATE TABLE `sys_role`  (
  `id` int(0) NOT NULL AUTO_INCREMENT COMMENT '物理主键',
  `name` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '角色名称',
  `code` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '角色代码',
  `sort` int(0) NULL DEFAULT NULL COMMENT '排序',
  `upt_act` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '数据状态（I插入 D删除 U更新）',
  `created_at` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `created_id` int(0) NULL DEFAULT NULL COMMENT '创建人ID',
  `updated_at` datetime(0) NULL DEFAULT NULL COMMENT '更新时间',
  `updated_id` int(0) NULL DEFAULT NULL COMMENT '更新人ID',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 15 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '系统角色表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_role
-- ----------------------------
INSERT INTO `sys_role` VALUES (1, '超级管理员', 'admin', 1, 'I', '2020-12-07 16:08:19', 1, '2020-12-07 16:08:22', 1);
INSERT INTO `sys_role` VALUES (2, '教师', 'teacher', 2, 'I', '2022-03-31 21:03:06', 36, '2022-03-31 21:04:15', 36);
INSERT INTO `sys_role` VALUES (3, '学生', 'student', 3, 'I', '2022-03-31 21:03:26', 36, '2022-03-31 21:04:18', 36);

-- ----------------------------
-- Table structure for sys_role_menu
-- ----------------------------
DROP TABLE IF EXISTS `sys_role_menu`;
CREATE TABLE `sys_role_menu`  (
  `role_id` int(0) NOT NULL COMMENT '角色ID',
  `menu_id` int(0) NOT NULL COMMENT '菜单ID',
  PRIMARY KEY (`role_id`, `menu_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '系统【角色】【菜单】表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_role_menu
-- ----------------------------
INSERT INTO `sys_role_menu` VALUES (1, 1);
INSERT INTO `sys_role_menu` VALUES (1, 2);
INSERT INTO `sys_role_menu` VALUES (1, 3);
INSERT INTO `sys_role_menu` VALUES (1, 4);
INSERT INTO `sys_role_menu` VALUES (1, 5);
INSERT INTO `sys_role_menu` VALUES (1, 6);
INSERT INTO `sys_role_menu` VALUES (1, 52);
INSERT INTO `sys_role_menu` VALUES (1, 54);
INSERT INTO `sys_role_menu` VALUES (1, 60);
INSERT INTO `sys_role_menu` VALUES (1, 62);
INSERT INTO `sys_role_menu` VALUES (1, 70);
INSERT INTO `sys_role_menu` VALUES (1, 71);
INSERT INTO `sys_role_menu` VALUES (1, 72);
INSERT INTO `sys_role_menu` VALUES (1, 73);
INSERT INTO `sys_role_menu` VALUES (1, 74);
INSERT INTO `sys_role_menu` VALUES (1, 75);
INSERT INTO `sys_role_menu` VALUES (1, 76);
INSERT INTO `sys_role_menu` VALUES (2, 5);
INSERT INTO `sys_role_menu` VALUES (2, 6);
INSERT INTO `sys_role_menu` VALUES (2, 52);
INSERT INTO `sys_role_menu` VALUES (2, 54);
INSERT INTO `sys_role_menu` VALUES (2, 60);
INSERT INTO `sys_role_menu` VALUES (2, 62);
INSERT INTO `sys_role_menu` VALUES (2, 70);
INSERT INTO `sys_role_menu` VALUES (2, 71);
INSERT INTO `sys_role_menu` VALUES (2, 72);
INSERT INTO `sys_role_menu` VALUES (2, 73);
INSERT INTO `sys_role_menu` VALUES (2, 74);
INSERT INTO `sys_role_menu` VALUES (2, 75);
INSERT INTO `sys_role_menu` VALUES (2, 76);
INSERT INTO `sys_role_menu` VALUES (3, 5);
INSERT INTO `sys_role_menu` VALUES (3, 6);
INSERT INTO `sys_role_menu` VALUES (3, 52);
INSERT INTO `sys_role_menu` VALUES (3, 54);
INSERT INTO `sys_role_menu` VALUES (3, 62);
INSERT INTO `sys_role_menu` VALUES (3, 70);
INSERT INTO `sys_role_menu` VALUES (3, 72);
INSERT INTO `sys_role_menu` VALUES (3, 73);
INSERT INTO `sys_role_menu` VALUES (3, 76);

-- ----------------------------
-- Table structure for sys_user
-- ----------------------------
DROP TABLE IF EXISTS `sys_user`;
CREATE TABLE `sys_user`  (
  `id` int(0) NOT NULL AUTO_INCREMENT COMMENT '物理主键',
  `username` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '账号',
  `name` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '姓名',
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '密码',
  `sex` varchar(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '性别',
  `phone` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '电话',
  `native_place` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '籍贯',
  `birth` datetime(0) NULL DEFAULT NULL COMMENT '出生年月',
  `upt_act` varchar(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '数据状态（I插入 D删除 U更新）',
  `created_id` int(0) NULL DEFAULT NULL COMMENT '创建人ID',
  `created_at` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `updated_id` int(0) NULL DEFAULT NULL COMMENT '更新人ID',
  `updated_at` datetime(0) NULL DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 55 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '系统用户表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_user
-- ----------------------------
INSERT INTO `sys_user` VALUES (1, 'admin', '超级管理员', 'e4589e240e8c2c60bd8ee6b99e1411bb', NULL, NULL, NULL, NULL, 'U', 31, '2020-12-17 15:07:35', 36, '2022-03-31 21:12:03');
INSERT INTO `sys_user` VALUES (52, '123', 'teacher', '743c4d81b35239313001ae8e8a142acc', '1', '17350178366', NULL, '2022-03-01 08:00:00', 'I', 1, '2022-03-31 22:27:55', 52, '2022-04-01 23:27:22');
INSERT INTO `sys_user` VALUES (53, '1234', 'student', '743c4d81b35239313001ae8e8a142acc', NULL, NULL, NULL, NULL, 'I', 1, '2022-03-31 22:29:25', 1, '2022-03-31 22:29:25');
INSERT INTO `sys_user` VALUES (54, '110', '王五', '743c4d81b35239313001ae8e8a142acc', '1', '110', '福州马尾', '2022-03-01 08:00:00', 'I', 52, '2022-04-03 02:52:19', 52, '2022-04-03 02:52:19');

-- ----------------------------
-- Table structure for sys_user_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_user_role`;
CREATE TABLE `sys_user_role`  (
  `user_id` int(0) NOT NULL COMMENT '用户ID',
  `role_id` int(0) NOT NULL COMMENT '角色ID',
  PRIMARY KEY (`user_id`, `role_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '系统【用户】【角色】关联表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_user_role
-- ----------------------------
INSERT INTO `sys_user_role` VALUES (1, 1);
INSERT INTO `sys_user_role` VALUES (52, 2);
INSERT INTO `sys_user_role` VALUES (53, 3);
INSERT INTO `sys_user_role` VALUES (54, 2);

-- ----------------------------
-- Table structure for teacher_course_class
-- ----------------------------
DROP TABLE IF EXISTS `teacher_course_class`;
CREATE TABLE `teacher_course_class`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `teacher_id` int(0) NULL DEFAULT NULL,
  `course_id` int(0) NULL DEFAULT NULL,
  `class_id` int(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 17 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of teacher_course_class
-- ----------------------------
INSERT INTO `teacher_course_class` VALUES (9, 52, 1, 2);
INSERT INTO `teacher_course_class` VALUES (10, 52, 1, 9);
INSERT INTO `teacher_course_class` VALUES (11, 52, 2, 1);
INSERT INTO `teacher_course_class` VALUES (12, 54, 6, 5);
INSERT INTO `teacher_course_class` VALUES (14, 54, 7, 6);
INSERT INTO `teacher_course_class` VALUES (15, 54, 7, 7);
INSERT INTO `teacher_course_class` VALUES (16, 52, 3, 2);

SET FOREIGN_KEY_CHECKS = 1;
