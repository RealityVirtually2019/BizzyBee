import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'

import Entry from './views/Entry.vue'
import Build from './views/Build.vue'
import Gardener from './views/Gardener.vue'
import Gardening from './views/Gardening.vue'
import Garden from './views/Garden.vue'

import EnterVR from './views/EnterVR.vue'
import EnterAR from './views/EnterAR.vue'

import Jason from './views/Jason.vue'
import Mo from './views/Mo.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Entry,
    },
    {
      path: '/entry',
      name: 'entry',
      component: Entry,
    },
    {
      path: '/build',
      name: 'build',
      component: Build,
    },
    {
      path: '/gardener/:gardenKey',
      name: 'Gardener',
      component: Gardener,
    },
    {
      path: '/gardening/:gardenKey',
      name: 'Gardener',
      component: Gardening,
    },
    {
      path: '/garden/:linkKey',
      name: 'Garden',
      component: Garden,
    },
    {
      path: '/enterVR/:linkKey',
      name: 'EnterVR',
      component: EnterVR,
    },
    {
      path: '/enterAR/:linkKey',
      name: 'EnterAR',
      component: EnterAR,
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
