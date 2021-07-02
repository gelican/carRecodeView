import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import api from './http/api'
import './assets/iconfont/iconfont.css'
import Vant from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant);

Vue.config.productionTip = false

Vue.prototype.$api = api
Vue.prototype.$bus = new Vue()

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
