import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '../views/Home.vue';
import TeacherDetail from '../views/TeacherDetail.vue';

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
    path: '/teacherdetail',
    name: 'TeacherDetail',
    component: TeacherDetail,
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
