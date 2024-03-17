import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from '@/router'

//引入axios配置
import axios from '@/utils/request'
import store from './store';
Vue.use(ElementUI);
Vue.config.productionTip = false
//修改vue的原型链
Vue.prototype.$axios = axios

new Vue({
  store,
  axios,
  router,
  render: h => h(App),
}).$mount('#app')
