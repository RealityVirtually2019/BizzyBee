import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

// import 'aframe'
// import '@/utils/aframeComponents'

import './plugins/element.js'

import VueFire from 'vuefire'
Vue.use(VueFire)

import Timeago from 'vue-timeago'
Vue.use(Timeago)

import VueGlide from 'vue-glide-js'
import 'vue-glide-js/dist/vue-glide.css'
Vue.use(VueGlide)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
