import Vue from 'vue';
import VueCookies from 'vue-cookies';
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Video from 'video.js';
import 'video.js/dist/video-js.css';
import router from './router';
import App from './App.vue';

Vue.config.productionTip = false;

Vue.use(VueCookies);
Vue.use(ElementUI);
Vue.prototype.$axios = axios;
Vue.prototype.$video = Video;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
