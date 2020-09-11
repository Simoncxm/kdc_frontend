import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/createPost',
    name: 'createPost',
    component: () => import('../components/CreatePost.vue'),
  },
  {
    path: '/posts',
    name: 'posts',
    component: () => import('../components/Posts.vue'),
  },
  {
    path: '/community',
    name: 'community',
    component: () => import('../views/Community.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
