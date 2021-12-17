import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Marketing from './pages/Marketing.vue'
import Finance from './pages/Finance.vue'
import Personnel from './pages/Personnel.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    component: Marketing
  },
  {
    path: '/marketing',
    name: 'marketing',
    component: Marketing
  },
  {
    path: '/finance',
    name: 'finance',
    component: Finance
  },
  {
    path: '/personnel',
    name: 'personnel',
    component: Personnel
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
