import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

import 'aframe'

import './plugins/element.js'

import VueFire from 'vuefire'
Vue.use(VueFire)

import Timeago from 'vue-timeago'
Vue.use(Timeago)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
