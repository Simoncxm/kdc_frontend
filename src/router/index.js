import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '../views/Home.vue';
import TeacherDetail from '../views/TeacherDetail.vue';
import ClassDetail from '../views/ClassDetail.vue';

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
    path: '/teacher/:teacherID',
    name: 'TeacherDetail',
    component: TeacherDetail,
  },
  {
    path: '/clazz/:classID',
    name: 'ClassDetail',
    component: ClassDetail,
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
