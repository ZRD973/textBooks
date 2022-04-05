import { request } from '@/utils/request'

export function operateClass (data) {
  return request({
    url: '/api/class',
    method: 'post',
    data
  })
}

export function operateCourse (data) {
  return request({
    url: '/api/course',
    method: 'post',
    data
  })
}

export function teacherOperateCourse (data) {
  return request({
    url: '/api/teacher/course',
    method: 'post',
    data
  })
}
export function queryTeacherCourseClass (data) {
  return request({
    url: '/api/teacher/course/class',
    method: 'post',
    data
  })
}

export function operateTeacher (data) {
  return request({
    url: '/api/teacher',
    method: 'post',
    data
  })
}
export function getClassCourse (data) {
  return request({
    url: '/api/class/course',
    method: 'post',
    data
  })
}
export function getCourseBook (data) {
  return request({
    url: '/api/course/book',
    method: 'post',
    data
  })
}
export function getRecordDetail (data) {
  return request({
    url: '/api/record/detail',
    method: 'post',
    data
  })
}

