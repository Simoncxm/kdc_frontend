import Vue from 'vue'
import VueCookies from 'vue-cookies';
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Video from 'video.js';
import 'video.js/dist/video-js.css';
import App from './App.vue'
import store from './store/index'
import router from './router'
import TWebLive from 'tweblive'
import im from 'tim'
import { showVconsole } from './utils/vconsole'
import './assets/icon/iconfont.css'
import './assets/icon/tim.css'
import './assets/css/reset.css'
import './assets/css/animate.css'
import QRCode from 'qrcode'


window.im = im
window.TWebLive = TWebLive
window.store = store
Vue.prototype.$bus = new Vue() // event Bus 用于无关系组件间的通信。
Vue.prototype.im = im
Vue.prototype.TWebLive = TWebLive
Vue.prototype.$store = store
Vue.prototype.qrcode = QRCode
Vue.prototype.$confirm = ElementUI.MessageBox.confirm
Vue.prototype.$axios = axios;
Vue.prototype.$video = Video;

Vue.use(QRCode)
Vue.use(VueCookies);
Vue.use(ElementUI);
// 在移动端开发环境下是否开启 vconsole,默认关闭
showVconsole(false)

// new Vue({
//   render: h => h(App)
// }).$mount('#app')


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
