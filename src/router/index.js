import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '../views/Home.vue';
import TeacherDetail from '../views/TeacherDetail.vue';
import CourseDetail from '../views/CourseDetail.vue';
import TeacherVerify from '../views/TeacherVerify.vue';

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/teacher/*',
    name: 'TeacherDetail',
    component: TeacherDetail,
  },
  {
    path: '/course/*',
    name: 'CourseDetail',
    component: CourseDetail,
  },
  {
    path: '/teacherverify',
    name: 'TeacherVerify',
    component: TeacherVerify,
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
