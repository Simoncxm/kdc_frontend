import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '../views/Home.vue';
import TeacherDetail from '../views/TeacherDetail.vue';

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
