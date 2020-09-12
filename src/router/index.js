import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '../views/Home.vue';
import TeacherDetail from '../views/TeacherDetail.vue';
import CourseDetail from '../views/CourseDetail.vue';
import TeacherVerify from '../views/TeacherVerify.vue';
import VideoPlayer from '../views/VideoPlayer.vue';

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
  {
    path: '/videoPlayer/*',
    name: 'VideoPlayer',
    component: VideoPlayer,
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
    children: [
      {
        path: '',
        name: 'Posts',
        component: () => import('../components/Posts.vue'),
      },
      {
        path: 'comments',
        name: 'Comments',
        component: () => import('../components/Comments.vue'),
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
