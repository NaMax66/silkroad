import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './main.css'
import VueSocketIO from 'vue-socket.io'
import { getUrl } from '@/utils'

Vue.config.productionTip = false
Vue.use(new VueSocketIO({
  debug: true,
  connection: getUrl(),
  vuex: {
    store,
    actionPrefix: 'SOCKET_',
    mutationPrefix: 'SOCKET_'
  }
}))

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
