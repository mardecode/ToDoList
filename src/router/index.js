import Vue from 'vue'
import VueRouter from 'vue-router'
// import App from '../App.vue'
// import Login from '../components/Login'
import Login from '@/components/Login'
import MainTodo from '../views/MainTodo'

Vue.use(VueRouter)

  const routes = [
    
  {
    path: '/',
    name: 'Home',
    component: Login
  },
  {
    path: '/main',
    name:'MainTodo',
    component: MainTodo
  },
  // {
  //   path: '/test',
  //   name:'Login',
  //   component: MainTodo
  // },
]

const router = new VueRouter({
  routes
})

export default router
