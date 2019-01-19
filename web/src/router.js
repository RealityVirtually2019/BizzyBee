import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Jason from './views/Jason.vue'
import Mo from './views/Mo.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/mo',
      name: 'mo',
      component: Mo,
    },
    {
      path: '/jason',
      name: 'jason',
      component: Jason,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
  ],
})
