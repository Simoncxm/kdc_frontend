import Vue from 'vue';
import Router from 'vue-router';
// import { isLogin } from './store/modules/user'
import Home from './views/Home.vue';
import TeacherDetail from './views/TeacherDetail.vue';
import CourseDetail from './views/CourseDetail.vue';
import TeacherVerify from './views/TeacherVerify.vue';
import VideoPlayer from './views/VideoPlayer.vue';
import SearchTeacherResult from './views/SearchTeacherResult.vue';
import SearchCourseResult from './views/SearchCourseResult.vue';

Vue.use(Router);
// Vue.use(Loading);
const router= new Router({
    mode: 'history',
    routes: [
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
    path: '/teacherVerify',
    name: 'TeacherVerify',
    component: TeacherVerify,
    },
    {
    path: '/courseSearchResult/*',
    name: 'SearchCourseResult',
    component: SearchCourseResult,
    },
    {
    path: '/teacherSearchResult/*',
    name: 'SearchTeacherResult',
    component: SearchTeacherResult,
    },
    {
    path: '/videoPlayer/*',
    name: 'VideoPlayer',
    component: VideoPlayer,
    },
    {
    path: '/createPost',
    name: 'createPost',
    component: () => import('./components/CreatePost.vue'),
    },
    {
    path: '/posts',
    name: 'posts',
    component: () => import('./components/Posts.vue'),
    },
    {
    path: '/community',
    name: 'community',
    component: () => import('./views/Community.vue'),
    children: [
        {
        path: '',
        name: 'Posts',
        component: () => import('./components/Posts.vue'),
        },
        {
        path: 'comments',
        name: 'Comments',
        component: () => import('./components/Comments.vue'),
        },
    ],
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('./components/sms-login/index')
    },

    {
        path: '/pc-pusher',
        name: 'pusherPc',
        component: () => import(/* webpackChunkName: "group-pusher" */ './pusher/IndexPc')
    },
    {
        path: '/pc-player',
        name: 'playerPc',
        component: () => import(/* webpackChunkName: "group-player" */'./player/IndexPc')
    },
    {
        path: '/mobile-pusher',
        name: 'pusherMobile',
        component: () => import(/* webpackChunkName: "group-pusher" */ './pusher/IndexMobile')
    },
    {
        path: '/mobile-player',
        name: 'playerMobile',
        component: () => import(/* webpackChunkName: "group-player" */'./player/IndexMobile')
    }
    ]
});


export default router;
