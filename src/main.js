import Vue from 'vue';
import VueCookies from 'vue-cookies';
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;

Vue.use(VueCookies);
Vue.use(ElementUI);

Vue.prototype.$axios = axios;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
