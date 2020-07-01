import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Multiplay from '../views/Multiplay.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/multiplay',
    name: 'multiplay',
    component: Multiplay
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router