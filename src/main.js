import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from '@/router'

//Introducing axios configuration
import axios from '@/utils/request'
import store from './store';
Vue.use(ElementUI);
Vue.config.productionTip = false
//Modifying vue's prototype chain
Vue.prototype.$axios = axios

new Vue({
  store,
  axios,
  router,
  render: h => h(App),
}).$mount('#app')
