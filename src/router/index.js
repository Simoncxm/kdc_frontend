import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import PlayVideo from '@/views/PlayVideo.vue';
import UploadVideo from '@/views/UploadVideo.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/play',
    name: 'PlayVideo',
    component: PlayVideo,
  },
  {
    path: '/upload',
    name: 'UploadVideo',
    component: UploadVideo,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
