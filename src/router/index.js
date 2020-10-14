import Vue from 'vue'
import VueRouter from 'vue-router';
import shopping from '@/views/shopping'
import stickys from '@/views/stickys'
import todo from '@/views/todo'
import Login from '@/views/Login'
import SignUp from '@/views/SignUp'

Vue.use(VueRouter)

const routes = [
  {
    path: '/stickys',
    name: 'stickys',
    component: stickys
  },
  {
    path: '/shopping',
    name: 'shopping',
    component: shopping
  },
  {
    path: '/todo',
    name: 'todo',
    component: todo
  },
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUp
  },
]

const router = new VueRouter({
  routes
})

export default router
