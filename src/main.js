// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import axios from 'axios'


import http from './servers/http.js' //axios实例化后引入取名http
Vue.prototype.http = http //放入全局


import common from "./commonFunction/common.js"
Vue.prototype.$common = common;

import 'lib-flexible/flexible'

import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);


import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// router.afterEach((to, from, next) => {
//   window.scrollTo(0, 0);

// });

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
