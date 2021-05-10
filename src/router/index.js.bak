import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import List from '../views/List.vue'
import Me from '../views/Me.vue'
import Login from '../views/Login.vue'
import Detail from '../views/Detail.vue'
import Register from '../views/Register.vue'

Vue.use(VueRouter)

const routes = [
  {
    path:'/register',
    name:'Register',
    component:Register
  },
  {
    path:'/detail',
    name:'detail',
    component:Detail
  },
  {
    path:'/login',
    name:'login',
    component:Login
  },
  {
    path:'/me',
    name:'me',
    component:Me
  },
  {
    path:'/list',
    name:'List',
    component:List
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
