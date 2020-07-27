import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './main.css'
import VueSocketIO from 'vue-socket.io'
import VueI18n from 'vue-i18n'
import { messages } from '@/locale'
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
Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'en',
  messages
})
new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
