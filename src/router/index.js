import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import List from '../views/List.vue'
import Me from '../views/Me.vue'
import Login from '../views/Login.vue'
import Detail from '../views/Detail.vue'
import Register from '../views/Register.vue'
import SMSlogin from '../views/SMSlogin.vue'
import Follows from '../views/Follows.vue'
import Likes from '../views/Likes.vue'
import History from '../views/History.vue'


Vue.use(VueRouter)

//解决 Cannot read property '_normalized' of undefined
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}

 
const routes = [
  {
    path:'/History',
    name:'History',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>import(/* webpackChunkName: "smslogin" */ '../views/History.vue')
  },
  {
    path:'/Likes',
    name:'Likes',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>import(/* webpackChunkName: "smslogin" */ '../views/Likes.vue')
  },
  {
    path:'/follows',
    name:'Follows',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>import(/* webpackChunkName: "smslogin" */ '../views/Follows.vue')
  },
  {
    path:'/smslogin',
    name:'SMSlogin',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>import(/* webpackChunkName: "smslogin" */ '../views/SMSlogin.vue')
  },
  {
    path:'/register',
    name:'Register',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>import(/* webpackChunkName: "register" */ '../views/Register.vue')
  },
  {
    path:'/detail',
    name:'Detail',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>import(/* webpackChunkName: "detail" */ '../views/Detail.vue')
  },
  {
    path:'/login',
    name:'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path:'/me',
    name:'me',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>import(/* webpackChunkName: "me" */ '../views/Me.vue')
  },
  {
    path:'/list',
    name:'List',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>import(/* webpackChunkName: "list" */ '../views/List.vue')
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
